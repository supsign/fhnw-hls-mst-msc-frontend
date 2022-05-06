<template>
    <div class="container p-3 mx-auto">
        <Card>
            <PersonalData @getCourseData="getCourseData" />
        </Card>
        <Card v-if="courseData">
            <CourseSelection :course-data="courseData" />
        </Card>
    </div>
</template>
<script setup lang="ts">
import PersonalData from '../components/home/PersonalData.vue';
import CourseSelection from '../components/home/CourseSelection.vue';

import axios from 'axios';
import { ref } from 'vue';

const courseData = ref();

async function getCourseData(specialization: any, studyMode: any, semester: any) {
    const response = await axios.get(
        `/coursedata/${specialization.id}?study_mode=${studyMode.id}&semester=${semester.id}`
    );
    courseData.value = response.data;
}
</script>
