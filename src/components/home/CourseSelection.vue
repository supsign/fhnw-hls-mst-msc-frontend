<template>
    <div v-if="courseData" class="flex flex-col gap-10 mt-10">
        <CourseGroup
            v-for="(group, index) in courseData.courses[0]"
            :key="index"
            :group="group"
            :selectedCourses="selectedCourses"
            :semesters="courseData.semesters"
        />
        <EctsCount :texts="courseData.texts" :ects="ects" />
        <CourseGroup
            v-for="(group, index) in courseData.courses[1]"
            :key="index"
            :group="group"
            :selectedCourses="selectedCourses"
            :semesters="courseData.semesters"
        />
    </div>
</template>
<script setup lang="ts">
import { whenever } from '@vueuse/core';
import { PropType, provide, ref } from 'vue';
import { CourseDataResponse } from '../../interfaces/courseData.interface';
import CourseGroup from './CourseGroup.vue';
import EctsCount from './EctsCount.vue';
const props = defineProps({
    courseData: { type: Object as PropType<CourseDataResponse>, required: true },
    ects: Number,
});

const emits = defineEmits(['updateSelectedCoursesData']);

const selectedCourses = ref([]);

whenever(selectedCourses.value, (value) => {
    emits('updateSelectedCoursesData', value);
});
</script>
