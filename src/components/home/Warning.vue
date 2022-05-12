<template>
    <div class="sticky ml-auto top-60 shadow-xl bg-orange-400 w-96 right-0 p-1">
        <div class="font-bold text-lg mb-3">Warning - Overlapping Courses</div>
        <div
            v-for="(semester, index) in semestersWithOverlappingCourses"
            :key="index"
            class="border-b last:border-0 pb-1 last:pb-0"
        >
            <div v-if="index === 0">
                {{ semester.semester.short_name ? semester.semester.short_name : semester.semester.name }}
            </div>
            <div v-for="(course, index) in semester.courses" :key="index"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { SemesterWithOverlappingCourses } from '../../interfaces/course.interface';
const props = defineProps({
    semestersWithOverlappingCourses: Array as PropType<Array<SemesterWithOverlappingCourses>>,
});
</script>
