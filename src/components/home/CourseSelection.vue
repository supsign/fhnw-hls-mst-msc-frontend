<template>
    <div v-if="courseData" class="flex flex-col gap-10 mt-10">
        {{ selectedCourses }}
        <CourseGroup
            v-for="(group, index) in courseData.courses[0]"
            :key="index"
            :group="group"
            :selectedCourses="selectedCourses"
        />
        <FurtherCourseGroup
            v-for="(group, index) in courseData.courses[0]"
            :key="index"
            :group="group"
            :selectedCourses="selectedCourses"
        />
    </div>
</template>
<script setup lang="ts">
import { PropType, provide, ref } from 'vue';
import { CourseDataResponse } from '../../interfaces/courseData.interface';
import CourseGroup from './CourseGroup.vue';
import FurtherCourseGroup from './FurtherCourseGroup.vue';
const props = defineProps({
    courseData: { type: Object as PropType<CourseDataResponse>, required: true },
});

provide('semesters', props.courseData.semesters);

const selectedCourses = ref([]);
</script>
