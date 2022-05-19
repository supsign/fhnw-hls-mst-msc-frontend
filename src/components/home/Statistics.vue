<template>
    <div class="flex flex-col gap-5">
        <div class="text-lg font-bold">Summary Statistics</div>
        <div>{{ statistics.specialization }} of Specialisation Modules</div>
        <div>{{ statistics.cluster }} of Cluster-specific Modules</div>
        <div>{{ statistics.core }} Core Competence Modules</div>
        <div class="flex flex-col w-32">
            <div class="flex border-b">
                <div class="p-1 w-20">Semester</div>
                <div class="p-1 w-12 text-right">ECTS</div>
            </div>
            <div v-for="(semester, index) in semesterWithCourses" :key="index" class="flex">
                <div class="p-1 w-20 border-x border-b">
                    {{ semester.short_name ? semester.short_name : semester.name }}
                </div>
                <div class="p-1 w-12 text-right border-b border-r">{{ getEctsFromCourses(semester.courses) }}</div>
            </div>
            <div class="flex">
                <div class="p-1 w-20 border-x border-b">Total</div>
                <div class="p-1 w-12 text-right border-b border-r">{{ statistics.ects }}</div>
            </div>
        </div>
        <div v-if="masterThesis.start.start">
            Possible Timeframe of Thesis: {{ masterThesis.start.start.long_name }} -
            {{ masterThesis.start.end }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { IThesisSelection } from '../../interfaces/theses.interface';
import { ISemester } from '../../interfaces/semester.interface';
import { IStatistics } from '../../interfaces/statistics.interface';
import { getEctsFromCourses } from '../../helpers/counts';
const props = defineProps({
    semesterWithCourses: { type: Array as PropType<Array<ISemester>>, required: true },
    masterThesis: { type: Object as PropType<IThesisSelection>, required: true },
    statistics: { type: Object as PropType<IStatistics>, required: true },
});
</script>
