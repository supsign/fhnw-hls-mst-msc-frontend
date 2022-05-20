<template>
    <div class="shadow-xl bg-orange-400 p-2 rounded-md">
        <div class="font-bold text-lg mb-3">Warning - Overlapping Courses</div>
        <div class="flex gap-10 flex-wrap">
            <div v-for="(semester, index) in semestersWithOverlappingCourses" :key="index">
                <div v-if="semester.courses.length">
                    <div class="font-bold">
                        {{ semester.semester.short_name ? semester.semester.short_name : semester.semester.name }}
                    </div>
                    <div v-for="(courses, index) in semester.courses" :key="index" class="mb-5">
                        <div v-for="(course, index) in courses" :key="index">- {{ course.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { ISemesterWithOverlappingCourses } from '../../interfaces/course.interface';
const props = defineProps({
    semestersWithOverlappingCourses: Array as PropType<Array<ISemesterWithOverlappingCourses>>,
});
</script>
