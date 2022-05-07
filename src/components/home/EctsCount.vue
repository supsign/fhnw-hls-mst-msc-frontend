<template>
    <div class="sticky top-0 bg-hls p-2 z-10 self-start">
        <div v-html="description.content"></div>
        <div>Current ECTS: {{ ects }}/50</div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    texts: Array,
    ects: { type: Number, default: 0 },
});
const description = props.texts?.find((text) => text.name === 'description_before_further');
</script>
