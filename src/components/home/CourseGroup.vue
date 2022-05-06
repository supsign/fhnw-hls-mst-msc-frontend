<template>
    <div>
        <div class="mb-5 text-lg font-bold">
            {{ group.title }}
        </div>
        <div class="mb-5" v-html="group.description"></div>
        <div class="flex">
            <div class="w-[26rem] p-1 border-b"></div>
            <div class="w-10 border-b"></div>
            <div class="flex gap-5 border-b">
                <div class="w-20 text-center">none</div>
                <div v-for="(semester, index) in semesters" :key="index" class="w-20 text-center">
                    {{ semester.short_name }}
                </div>
                <div class="w-20 text-center">later</div>
            </div>
        </div>
        <div class="max-w-min">
            <Course
                v-for="(course, index) in group.courses"
                :key="index"
                :course="course"
                :type="group.course_group_type_short_name"
                @addCour
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { inject, PropType } from 'vue';
import { CourseGroup } from '../../interfaces/courseData.interface';
import { Semester } from '../../interfaces/semester.interface';
import Course from './Course.vue';

const props = defineProps({
    group: { type: Object as PropType<CourseGroup>, required: true },
    selectedCourses: Array,
});
const semesters: Array<Semester> | undefined = inject('semesters');
</script>
