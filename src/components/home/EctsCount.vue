<template>
    <div class="sticky top-0 shadow-xl bg-hls border p-2 z-10 self-start">
        <div v-if="description" v-html="description.content"></div>
        <div class="font-bold flex gap-5 divide-x-2 divide-black">
            <div>Current ECTS: {{ statistics.ects }}/50</div>
            <div class="pl-5">{{ statistics.specialization }} S</div>
            <div class="pl-5">{{ statistics.cluster }} CS</div>
            <div class="pl-5">{{ statistics.core }} CC</div>
            <div class="pl-5">{{ statistics.outside }} Modules Outside</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { IStatistics } from '../../interfaces/statistics.interface';
import { IText } from '../../interfaces/text.interface';

const props = defineProps({
    texts: { type: Array as PropType<Array<IText>>, required: true },
    statistics: { type: Object as PropType<IStatistics>, required: true },
});
const description: IText | null = props.texts.find((text) => text.name === 'description_before_further') || null;
</script>
