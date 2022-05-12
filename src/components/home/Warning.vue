<template>
    <div class="sticky ml-auto top-60 shadow-xl bg-orange-400 w-96 right-0 p-1">
        <div class="font-bold text-lg mb-3">Warning - Overlapping Courses</div>
        <div v-for="(courses, index) in overlappingCourses" :key="index" class="border-b last:border-0 pb-1 last:pb-0">
            <div v-for="(course, index) in courses" :key="index">
                <div v-if="index === 0 && course.selected_semester">
                    {{ course.selected_semester.short_name }}
                </div>
                <div>- {{ course.name }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { ICourse } from '../../interfaces/course.interface';
const props = defineProps({
    overlappingCourses: Array as PropType<Array<Array<ICourse>>>,
});
</script>
