<template>
    <div class="container p-3 mx-auto">
        <Card>
            <Personal @getCourseData="getCourseData" @updatePersonalData="updatePersonalData" />
        </Card>
        <Card v-if="courseData">
            <CourseSelection :course-data="courseData" />
        </Card>
        <Card v-if="courseData">
            <ModulesOutside />
            <DoubleDegree />
            <MasterThesis :data="courseData.theses" />
            <OptionalEnglish />
            <AdditionalComments />
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
import MasterThesis from '../components/home/MasterThesis.vue';
import OptionalEnglish from '../components/home/OptionalEnglish.vue';
import AdditionalComments from '../components/home/AdditionalComments.vue';
import { PersonalData } from '../interfaces/personalData.interface';

const courseData = ref();
const personalData: Ref<PersonalData | undefined> = ref();
const courseSelection = ref();

async function getCourseData(personalData: PersonalData) {
    if (!personalData.specialization || !personalData.studyMode || !personalData.semester) {
        return;
    }
    const response = await axios.post(`/coursedata/${personalData.specialization.id}`, {
        study_mode: personalData.studyMode.id,
        semester: personalData.semester.id,
    });
    courseData.value = response.data;
}

function updatePersonalData(personal: PersonalData) {
    personalData.value = personal;
    getCourseData(personal);
}
async function createPdf(personalData: PersonalData) {
    if (!personalData) {
        return;
    }
    axios.post('/pdf', {
        surname: personalData.surname,
        given_name: personalData.givenName,
        semester: personalData.semester?.id,
        study_mode: personalData.studyMode?.id,
        specialization: personalData.specialization?.id,
    });
}
</script>
