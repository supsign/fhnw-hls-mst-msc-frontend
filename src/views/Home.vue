<template>
    <div class="container p-3 mx-auto">
        <Card>
            <PersonalData @getCourseData="getCourseData" />
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
    </div>
</template>
<script setup lang="ts">
import PersonalData from '../components/home/PersonalData.vue';
import CourseSelection from '../components/home/CourseSelection.vue';

import axios from 'axios';
import { ref } from 'vue';
import { Specialization } from '../interfaces/specialization.interface';
import { StudyMode } from '../interfaces/studyMode.interface';
import { Semester } from '../interfaces/semester.interface';
import ModulesOutside from '../components/home/ModulesOutside.vue';
import DoubleDegree from '../components/home/DoubleDegree.vue';
import MasterThesis from '../components/home/MasterThesis.vue';
import OptionalEnglish from '../components/home/OptionalEnglish.vue';
import AdditionalComments from '../components/home/AdditionalComments.vue';

const courseData = ref();

async function getCourseData(studyMode: StudyMode, semester: Semester, specialization: Specialization) {
    const response = await axios.post(`/coursedata/${specialization.id}`, {
        study_mode: studyMode.id,
        semester: semester.id,
    });
    courseData.value = response.data;
}
</script>
