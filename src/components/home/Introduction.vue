<template>
    <div v-if="texts">
        <div v-if="title" class="text-2xl mb-2" v-html="title.content"></div>
        <div v-if="description" v-html="description.content"></div>
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { IText } from '../../interfaces/text.interface';

const props = defineProps({
    texts: { type: Array as PropType<Array<IText>>, required: true },
});

const title: IText | null = props.texts.find((text) => text.name === 'intro_title') || null;
const description: IText | null = props.texts.find((text) => text.name === 'intro_content') || null;
</script>
