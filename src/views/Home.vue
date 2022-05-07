<template>
    <div class="container p-3 mx-auto">
        <Card>
            <Personal @getCourseData="getCourseData" @updatePersonalData="updatePersonalData" />
        </Card>
        <!-- <Card v-if="courseData">
            {{ selectedCourses }}
            <CourseSelection :course-data="courseData" @updateSelectedCoursesData="updateSelectedCoursesData" />
        </Card>-->
        <Card v-if="courseData && masterThesisData">
            <ModulesOutside :texts="courseData.texts" @updateModulesOutsideData="updateModulesOutsideData" />
            <DoubleDegree :texts="courseData.texts" v-model="doubleDegree" />
            <MasterThesis :data="masterThesisData" v-model="masterThesis" />
            <OptionalEnglish />
            <AdditionalComments v-model="additionalComments" />
        </Card>
        <button @click="createPdf(personalData)" class="p-1 bg-blue-500">SUBMIT</button>
    </div>
</template>
<script setup lang="ts">
import Personal from '../components/home/Personal.vue';
import CourseSelection from '../components/home/CourseSelection.vue';

import axios from 'axios';
import { Ref, ref } from 'vue';
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
import { whenever } from '@vueuse/core';

const courseData: Ref<CourseDataResponse | undefined> = ref();
const personalData: Ref<PersonalData | undefined> = ref();
const selectedCourses = ref();
const outsideModules: Ref<Array<OutsideModule> | undefined> = ref();
const doubleDegree = ref(false);
const masterThesisData: Ref<Theses | undefined> = ref();
const masterThesis: Ref<ThesesSelection> = ref({ start: undefined, theses: [] });
const additionalComments = ref();

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

whenever(doubleDegree.value, () => getThesisData());

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
    axios.post('/pdf', {
        surname: personalData.value.surname,
        given_name: personalData.value.givenName,
        semester: personalData.value.semester?.id,
        study_mode: personalData.value.studyMode?.id,
        specialization: personalData.value.specialization?.id,
        selected_courses: selectedCourses.value,
        modules_outside: outsideModules.value,
        double_degree: doubleDegree.value,
        master_thesis: masterThesis.value,
        additional_comments: additionalComments.value,
    });
}
</script>
