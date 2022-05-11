<template>
    <div class="flex hover:bg-gray-50" :title="course.content">
        <div class="w-[26rem] border-b border-l border-r p-1">
            {{ course.name }}
        </div>
        <div class="w-10 border-r border-b p-1" v-if="!further" :title="tooltip">
            {{ type }}
        </div>
        <div class="border-b flex gap-5">
            <div class="w-20 text-center flex justify-center">
                <input type="radio" class="h-5 w-5 my-auto" v-model="course.selected_semester" :value="null" />
            </div>
            <div v-for="(semester, index) in semesters" :key="index" class="w-20 text-center flex justify-center">
                <input
                    v-if="semester.type === course.semester_type && index >= endIndex"
                    type="radio"
                    class="h-5 w-5 my-auto"
                    v-model="course.selected_semester"
                    :value="semester"
                />
            </div>
            <div class="w-20 text-center flex justify-center border-r">
                <input
                    type="radio"
                    class="h-5 w-5 my-auto"
                    v-model="course.selected_semester"
                    value="later"
                    v-if="endIndex === -1"
                />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, PropType, ref } from 'vue';
import { ICourse } from '../../interfaces/course.interface';
import { ISemester } from '../../interfaces/semester.interface';

const props = defineProps({
    course: { type: Object as PropType<ICourse>, required: true },
    semesters: { type: Array as PropType<Array<ISemester>>, required: true },
    type: String,
    further: Boolean,
    tooltip: String,
});
const endIndex = computed(() => {
    return props.semesters.findIndex((semester) => {
        if (semester.id === props.course.end_semester_id) {
            return semester;
        }
    });
});
props.course.selected_semester = null;
</script>
