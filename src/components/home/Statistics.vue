<template>
    <div class="flex flex-col gap-5">
        <div class="text-lg font-bold">Summary Statistics</div>
        <div>{{ specializationModulesCount }} of Specialisation Modules</div>
        <div>{{ clusterSpecificModulesCount }} of Cluster-specific Modules</div>
        <div>{{ coreCompetenceModulesCount }} Core Competence Modules</div>
        <div class="flex flex-col w-32">
            <div class="flex border-b">
                <div class="p-1 w-20">Semester</div>
                <div class="p-1 w-12 text-right">ECTS</div>
            </div>
            <div v-for="(semester, index) in semesterWithCourses" :key="index" class="flex">
                <div class="p-1 w-20 border-x border-b">
                    {{ semester.short_name ? semester.short_name : semester.name }}
                </div>
                <div class="p-1 w-12 text-right border-b border-r">{{ getEcts(semester.courses) }}</div>
            </div>
            <div class="flex">
                <div class="p-1 w-20 border-x border-b">Total</div>
                <div class="p-1 w-12 text-right border-b border-r">{{ ects }}</div>
            </div>
        </div>
        <div>
            Possible Timeframe of Thesis: {{ dayjs(masterThesis?.start.start.start_date).format('DD.MM.YYYY') }} -
            {{ dayjs(masterThesis?.start.end).format('DD.MM.YYYY') }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { PropType } from 'vue';
import { ICourse } from '../../interfaces/course.interface';
import { Theses } from '../../interfaces/theses.interface';
import dayjs from 'dayjs';
const props = defineProps({
    groupsWithSelectedCourses: Array,
    semesterWithCourses: Array,
    masterThesis: Object as PropType<Theses>,
});
const emits = defineEmits(['update:modelValue', 'updateEcts']);

const specializationModulesCount = computed(() => {
    const group = props.groupsWithSelectedCourses.find((group) => {
        if (group.type === 1 && group.hasOwnProperty('id')) {
            return group;
        }
    });
    return group.courses.length;
});

const coreCompetenceModulesCount = computed(() => {
    const group = props.groupsWithSelectedCourses.find((group) => {
        if (group.type === 3 && group.hasOwnProperty('id')) {
            return group;
        }
    });
    return group.courses.length;
});

const clusterSpecificModulesCount = computed(() => {
    const groups = props.groupsWithSelectedCourses.filter((group) => {
        if (group.type === 4) {
            return group;
        }
    });
    let count = 0;
    for (let group of groups) {
        count += group.courses.length;
    }
    return count;
});
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
