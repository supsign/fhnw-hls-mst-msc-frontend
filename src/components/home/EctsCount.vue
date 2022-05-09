<template>
    <div class="sticky top-0 bg-hls p-2 z-10 self-start">
        <div v-if="description" v-html="description.content"></div>
        <div>Current ECTS: {{ ects }}/50</div>
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { IText } from '../../interfaces/text.interface';

const props = defineProps({
    texts: { type: Array as PropType<Array<IText>>, required: true },
    ects: { type: Number, default: 0 },
});
const description: IText | null = props.texts.find((text) => text.name === 'description_before_further') || null;
</script>
