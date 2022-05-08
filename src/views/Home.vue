<template>
    <div class="container p-3 mx-auto">
        <Card>
            <Personal @getCourseData="getCourseData" @updatePersonalData="updatePersonalData" />
        </Card>
        <Card v-if="courseData">
            <CourseSelection
                :course-data="courseData"
                :ects="ects"
                @updateSelectedCoursesData="updateSelectedCoursesData"
            />
        </Card>
        <Card v-if="courseData && masterThesisData">
            <ModulesOutside :texts="courseData.texts" @updateModulesOutsideData="updateModulesOutsideData" />
            <DoubleDegree :texts="courseData.texts" v-model="doubleDegree" />
            <MasterThesis :data="masterThesisData" v-model="masterThesis" />
            <OptionalEnglish v-model="optionalCourses" :course-data="courseData" :selectedCourses="selectedCourses" />
            <AdditionalComments v-model="additionalComments" />
            <div class="flex justify-end">
                <button
                    @click="createPdf"
                    class="transition transform duration-300 ease-in-out text-white py-1 px-4 rounded-md shadow-sm w-60 bg-blue-700 hover:bg-blue-800 hover:shadow-xl cursor-pointer"
                >
                    Submit
                </button>
            </div>
        </Card>
    </div>
</template>
<script setup lang="ts">
import Personal from '../components/home/Personal.vue';
import axios from 'axios';
import { Ref, ref, watch } from 'vue';
import ModulesOutside from '../components/home/ModulesOutside.vue';
import DoubleDegree from '../components/home/DoubleDegree.vue';
import OptionalEnglish from '../components/home/OptionalEnglish.vue';
import AdditionalComments from '../components/home/AdditionalComments.vue';
import { PersonalData } from '../interfaces/personalData.interface';
import { SelectedCourses } from '../interfaces/selectedCourses.interface';
import { CourseDataResponse } from '../interfaces/courseData.interface';
import { OutsideModule } from '../interfaces/outsideModule.interface';
import MasterThesis from '../components/home/MasterThesis.vue';
import { Theses, ThesesSelection } from '../interfaces/theses.interface';
import CourseSelection from '../components/home/CourseSelection.vue';
import { computed } from '@vue/reactivity';
import { validateData } from '../helpers/validation';
import Card from '../components/base/Card.vue';
import { pdfDataService } from '../services/pdfData.service';

const courseData: Ref<CourseDataResponse | undefined> = ref();
const personalData: Ref<PersonalData | undefined> = ref();
const selectedCourses: Ref<Array<SelectedCourses> | undefined> = ref();
const outsideModules: Ref<Array<OutsideModule> | undefined> = ref();
const modulesOutside: Ref<Array<OutsideModule> | undefined> = ref();
const doubleDegree = ref(false);
const masterThesisData: Ref<Theses | undefined> = ref();
const masterThesis: Ref<ThesesSelection> = ref({ start: undefined, theses: [] });
const additionalComments = ref();
const optionalCourses = ref();
const ects = computed(() => {
    let count = 0;
    if (!selectedCourses.value) {
        return undefined;
    }
    for (let selected of selectedCourses.value) {
        for (let course of selected.courses) {
            count += course.ects;
        }
    }
    return count;
});

async function getCourseData(personalData: PersonalData) {
    if (!personalData.specialization || !personalData.studyMode || !personalData.semester) {
        return;
    }

    const response = await axios.post(`/coursedata/${personalData.specialization.id}`, {
        study_mode: personalData.studyMode.id,
        semester: personalData.semester.id,
    });
    courseData.value = response.data;
    getThesisData();
}

watch(doubleDegree, () => getThesisData());

async function getThesisData() {
    if (!personalData.value?.specialization || !personalData.value.semester || !personalData.value.studyMode) {
        return;
    }
    const response = await axios.post(`/thesisdata/${personalData.value.specialization.id}`, {
        double_degree: doubleDegree.value,
        semester: personalData.value?.semester.id,
        study_mode: personalData.value?.studyMode.id,
    });
    masterThesisData.value = response.data;
}

function updatePersonalData(personal: PersonalData) {
    personalData.value = personal;
    getCourseData(personal);
}
function updateSelectedCoursesData(courses: SelectedCourses) {
    selectedCourses.value = courses;
}
function updateModulesOutsideData(modulesOutside: Array<OutsideModule>) {
    modulesOutside.pop();
    outsideModules.value = modulesOutside;
}
async function createPdf() {
    if (!personalData.value) {
        return;
    }
    const pdfData = pdfDataService({
        surname: personalData.value.surname,
        givenName: personalData.value.givenName,
        semester: personalData.value.semester,
        studyMode: personalData.value.studyMode,
        specialization: personalData.value.specialization,
        courseData: courseData.value,
        outsideModules: outsideModules.value,
        doubleDegree: doubleDegree.value,
        masterThesis: masterThesis.value,
        optionalCourses: optionalCourses.value,
        additionalComments: additionalComments.value,
        ects: ects.value,
    });
    const validData = validateData(pdfData);

    axios.post('/pdf', validData);
}
</script>
