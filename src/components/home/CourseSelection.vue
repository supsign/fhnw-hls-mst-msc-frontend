<template>
    <div v-if="courseData" class="flex flex-col gap-10 mt-10">
        {{ selectedCourses }}
        <div v-for="(courses, index) in courseData.courses" :key="index">
            <CourseGroup
                v-for="(group, index) in courses"
                :key="index"
                :group="group"
                :selectedCourses="selectedCourses"
                :semesters="courseData.semesters"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { whenever } from '@vueuse/core';
import { PropType, provide, ref } from 'vue';
import { CourseDataResponse } from '../../interfaces/courseData.interface';
import CourseGroup from './CourseGroup.vue';
const props = defineProps({
    courseData: { type: Object as PropType<CourseDataResponse>, required: true },
});

const emits = defineEmits(['updateSelectedCoursesData']);

const selectedCourses = ref([]);

whenever(selectedCourses.value, (value) => {
    emits('updateSelectedCoursesData', value);
});
</script>
