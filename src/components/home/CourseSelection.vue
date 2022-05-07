<template>
    <div v-if="courseData" class="flex flex-col gap-10 mt-10">
        {{ selectedCourses }}
        <div v-for="(courses, index) in courseData.courses" :key="index">
            <CourseGroup
                v-for="(group, index) in courses"
                :key="index"
                :group="group"
                :selectedCourses="selectedCourses"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { PropType, provide, ref } from 'vue';
import { CourseDataResponse } from '../../interfaces/courseData.interface';
import CourseGroup from './CourseGroup.vue';
const props = defineProps({
    courseData: { type: Object as PropType<CourseDataResponse>, required: true },
});

provide('semesters', props.courseData.semesters);

const selectedCourses = ref([]);
</script>
