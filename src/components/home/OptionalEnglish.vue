<template>
    <div v-if="courseData">
        <div class="mb-5 text-lg font-bold">Optional English Class for MSc Students (no ECTS gained)</div>
        <div v-html="description.content" class="mb-5"></div>

        <div class="flex">
            <div class="w-[26rem] p-1 border-b"></div>
            <div class="w-10 border-b"></div>
            <div class="flex gap-5 border-b">
                <div class="w-20 text-center">none</div>
                <div v-for="(semester, index) in courseData.semesters" :key="index" class="w-20 text-center">
                    {{ semester.short_name }}
                </div>
                <div class="w-20 text-center">later</div>
            </div>
        </div>
        <Course
            :course="courseData.optional_courses.courses[0]"
            :semesters="courseData.semesters"
            @add-course="addCourse"
        />
    </div>
</template>
<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { inject, PropType, provide } from 'vue';
import { CourseDataResponse } from '../../interfaces/courseData.interface';
import Course from './Course.vue';
const props = defineProps({
    courseData: { type: Object as PropType<CourseDataResponse>, required: true },
    modelValue: Array,
});
const emits = defineEmits(['update:modelValue']);

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emits('update:modelValue', value);
    },
});
const description = props.courseData.optional_courses?.texts.find(
    (text) => text.name === 'optional_english_description'
);

function addCourse(courseId: number, semesterId: number | string) {
    const courses = [];
    if (semesterId !== 'none') {
        courses.push(courseId);
        value.value = [{ semesterId, courses }];
    } else {
        value.value = [];
    }
}
</script>
