<template>
    <div class="container p-3 mx-auto">
        <Card>
            <Personal v-model="personalData" @getCourseData="getCourseData" />
        </Card>
        <Card v-if="courseData">
            <CourseSelection :course-data="courseData" :ects="ects" />
        </Card>
        <Card v-if="courseData && masterThesisData">
            <ModulesOutside :texts="courseData.texts" @updateModulesOutsideData="updateModulesOutsideData" />
            <DoubleDegree :texts="courseData.texts" v-model="doubleDegree" />
            <MasterThesis :data="masterThesisData" v-model="masterThesis" />
            <OptionalEnglish :course-data="courseData" />
            <AdditionalComments v-model="additionalComments" />
            <Statistics
                v-if="groupsWithSelectedCourses && semesterWithCourses"
                :groupsWithSelectedCourses="groupsWithSelectedCourses"
                :semesterWithCourses="semesterWithCourses"
                :master-thesis="masterThesis"
                @update-ects="updateEcts"
            />

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
import { Ref, ref, watch, computed, ComputedRef, toRaw } from 'vue';
import ModulesOutside from '../components/home/ModulesOutside.vue';
import DoubleDegree from '../components/home/DoubleDegree.vue';
import OptionalEnglish from '../components/home/OptionalEnglish.vue';
import AdditionalComments from '../components/home/AdditionalComments.vue';
import { ICourseDataResponse, ICourseGroup } from '../interfaces/course.interface';
import MasterThesis from '../components/home/MasterThesis.vue';
import { IThesisDataResponse, IThesisSelection } from '../interfaces/theses.interface';
import CourseSelection from '../components/home/CourseSelection.vue';
import Card from '../components/base/Card.vue';
import { pdfDataService } from '../services/pdfData.service';
import Statistics from '../components/home/Statistics.vue';
import Swal from 'sweetalert2';
import { IPersonalData } from '../interfaces/personal.interface';
import { IModuleOutside } from '../interfaces/moduleOutside.interface';
import { ISemester } from '../interfaces/semester.interface';

const env = import.meta.env;

//Personal Data
const personalData: Ref<IPersonalData> = ref({
    surname: '',
    givenName: '',
    semester: null,
    studyMode: null,
    specialization: null,
});

//Course Data
const courseData: Ref<ICourseDataResponse | null> = ref(null);

async function getCourseData() {
    if (!personalData.value.specialization || !personalData.value.studyMode || !personalData.value.semester) {
        return;
    }
    courseData.value = null;
    const response = await axios.post<ICourseDataResponse>(`/coursedata/${personalData.value.specialization.id}`, {
        study_mode: personalData.value.studyMode.id,
        semester: personalData.value.semester.id,
    });
    courseData.value = response.data;
    getThesisData();
}

//Modules Outside
const modulesOutside: Ref<Array<IModuleOutside>> = ref([]);

function updateModulesOutsideData(data: Array<IModuleOutside>) {
    modulesOutside.value = data;
}

//Double Degree
const doubleDegree = ref(false);
watch(doubleDegree, () => getThesisData());

//Master Thesis
const masterThesisData: Ref<IThesisDataResponse | null> = ref(null);
const masterThesis: Ref<IThesisSelection> = ref({
    start: null,
    theses: [],
    furtherDetails: '',
});

async function getThesisData() {
    if (!personalData.value?.specialization || !personalData.value.semester || !personalData.value.studyMode) {
        return;
    }
    const response = await axios.post<IThesisDataResponse>(`/thesisdata/${personalData.value.specialization.id}`, {
        double_degree: doubleDegree.value,
        semester: personalData.value?.semester.id,
        study_mode: personalData.value?.studyMode.id,
    });
    masterThesisData.value = response.data;
    masterThesis.value.start = response.data.time_frames[0];
}

//Optional English
//@ts-ignore
const optionalEnglish: ComputedRef<ISemester[]> = computed(() => {
    if (!courseData.value) {
        return [
            {
                semesterId: null,
                courses: [],
            },
        ];
    }
    const course = courseData.value.optional_courses.courses[0];
    return [
        {
            semesterId: course.selected_semester ? course.selected_semester : null,
            courses: [course],
        },
    ];
});

//AdditionalComments
const additionalComments = ref();

//Statistics
const ects = ref(0);

function updateEcts(amount: number) {
    ects.value = amount;
}

const groupsWithSelectedCourses: ComputedRef<ICourseGroup[]> = computed(() => {
    if (!courseData.value) {
        return [];
    }
    const courseDataGroups: ICourseDataResponse = JSON.parse(JSON.stringify(courseData.value));
    const groups = courseDataGroups.courses[0];
    const groupsWithSelected = groups.map((group) => {
        group.courses = group.courses.filter((course) => {
            if (course.selected_semester) {
                return course;
            }
        });
        return group;
    });
    const furtherGroups = courseDataGroups.courses[1];
    const furtherGroupsWithSelected = furtherGroups.map((group) => {
        if (group.hasOwnProperty('specializations')) {
            group.courses = group.specializations
                .map((spec) => {
                    return spec.courses;
                })
                .flat(1)
                .filter((course) => {
                    if (course.selected_semester) {
                        return course;
                    }
                });
        }
        if (group.hasOwnProperty('clusters')) {
            group.courses = group.clusters
                .map((clusters) => {
                    return clusters.courses;
                })
                .flat(1)
                .filter((course) => {
                    if (course.selected_semester) {
                        return course;
                    }
                });
        }
        return group;
    });
    return groupsWithSelected.concat(furtherGroupsWithSelected);
});
//@ts-ignore
const semesterWithCourses: ComputedRef<ISemester[]> = computed(() => {
    if (!groupsWithSelectedCourses.value || !courseData.value) {
        return null;
    }
    const courses = [];
    for (let group of groupsWithSelectedCourses.value) {
        courses.push(group.courses);
    }
    const selectedCourses = courses.flat(1);
    const coursesInSemesters = courseData.value.semesters.map((semester) => {
        semester = JSON.parse(JSON.stringify(semester));
        semester.courses = selectedCourses.filter((course) => {
            if (course.selected_semester) {
                //@ts-ignore
                return course.selected_semester.id === semester.id;
            }
        });

        return semester;
    });
    const coursesInLater = [
        {
            name: 'later',
            courses: selectedCourses.filter((course) => {
                return course.selected_semester === 'later';
            }),
        },
    ];
    return [...coursesInSemesters, ...coursesInLater];
});

const errors = ref();
async function createPdf() {
    if (!personalData.value) {
        return;
    }
    const pdfData = ref();

    pdfData.value = pdfDataService({
        personalData: personalData.value,
        semestersWithCourses: semesterWithCourses.value,
        modulesOutside: modulesOutside.value,
        doubleDegree: doubleDegree.value,
        masterThesis: masterThesis.value,
        optionalCourses: optionalEnglish.value,
        additionalComments: additionalComments.value,
        groupsWithSelectedCourses: groupsWithSelectedCourses.value,
        ects: ects.value,
    });
    if (pdfData.value.hasOwnProperty('errors')) {
        errors.value = pdfData.value;
        Swal.fire({
            title: 'Error!',
            html: getErrorHtml(pdfData.value.errors),
            icon: 'error',
            confirmButtonText: 'OK',
        });
    }
    console.log(pdfData.value);

    const filename = await axios.post('/pdf', pdfData.value);
    window.open(env.VITE_BACKEND_URL + '/' + filename.data);
}

function getErrorHtml(errors: any) {
    let string = '';
    for (let error of errors) {
        string += `<div class="text-red-500">${error}</div>`;
    }
    return string;
}
</script>
