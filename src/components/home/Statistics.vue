<template>
    <div class="flex flex-col gap-5">
        <div class="text-lg font-bold">Summary Statistics</div>
        <div>{{ groupsWithSelectedCourses[0].courses.length }} of Specialisation Modules</div>
        <div>{{ groupsWithSelectedCourses[0].courses.length }} of Cluster-specific Modules</div>
        <div>
            {{ groupsWithSelectedCourses[4].courses.length + groupsWithSelectedCourses[5].courses.length }} Core
            Competence Modules
        </div>
        <div class="flex flex-col w-32">
            <div class="flex border-b">
                <div class="p-1 w-20">Semester</div>
                <div class="p-1 w-12 text-right">ECTS</div>
            </div>
            <div v-for="(semester, index) in semesterWithCourses" :key="index" class="flex">
                <div class="p-1 w-20 border-x border-b">{{ semester.short_name }}</div>
                <div class="p-1 w-12 text-right border-b border-r">{{ getEcts(semester.courses) }}</div>
            </div>
            <div class="flex">
                <div class="p-1 w-20 border-x border-b">Total</div>
                <div class="p-1 w-12 text-right border-b border-r">{{ ects }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ICourse } from '../../interfaces/course.interface';

const props = defineProps({
    groupsWithSelectedCourses: Array,
    semesterWithCourses: Array,
});
const emits = defineEmits(['update:modelValue', 'updateEcts']);

function getEcts(courses: ICourse[]) {
    let ects = 0;
    for (let course of courses) {
        ects += course.ects;
    }
    return ects;
}
const ects = computed(() => {
    let count = 0;
    for (let semester of props.semesterWithCourses) {
        count += getEcts(semester.courses);
    }
    emits('updateEcts', count);
    return count;
});
</script>
