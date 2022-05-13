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
            Possible Timeframe of Thesis: {{ masterThesis?.start.start.long_name }} -
            {{ masterThesis?.start.end }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { PropType } from 'vue';
import { ICourse, ICourseGroup } from '../../interfaces/course.interface';
import { IThesisSelection } from '../../interfaces/theses.interface';
import dayjs from 'dayjs';
import { ISemester } from '../../interfaces/semester.interface';
import { IModuleOutside } from '../../interfaces/moduleOutside.interface';
const props = defineProps({
    groupsWithSelectedCourses: { type: Array as PropType<Array<ICourseGroup>>, required: true },
    semesterWithCourses: { type: Array as PropType<Array<ISemester>>, required: true },
    masterThesis: Object as PropType<IThesisSelection>,
    modulesOutside: Array as PropType<Array<IModuleOutside>>,
});
const emits = defineEmits(['update:modelValue', 'updateEcts']);

const allCourses = computed(() => {
    return props.groupsWithSelectedCourses
        .map((group) => {
            return group.courses;
        })
        .flat(1);
});

const specializationModulesCount = computed(() => {
    return allCourses.value.filter((course) => course.type === 1).length;
});

const coreCompetenceModulesCount = computed(() => {
    return allCourses.value.filter((course) => course.type === 3).length;
});

const clusterSpecificModulesCount = computed(() => {
    return allCourses.value.filter((course) => course.type === 4).length;
});

function getEcts(courses: ICourse[]) {
    let ects = 0;
    for (let course of courses) {
        ects += course.ects;
    }
    return ects;
}
function getEctsFromModulesOutside(modulesOutside: IModuleOutside[]) {
    let count = 0;
    for (let module of modulesOutside) {
        count += module.ects;
    }
    return count;
}
const ects = computed(() => {
    let count = 0;
    for (let semester of props.semesterWithCourses) {
        count += getEcts(semester.courses);
    }
    if (props.modulesOutside) {
        count += getEctsFromModulesOutside(props.modulesOutside);
    }
    emits('updateEcts', count);
    return count;
});
</script>
