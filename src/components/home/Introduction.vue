<template>
    <div v-if="texts">
        <div class="text-2xl mb-2" v-html="title.content"></div>
        <div v-html="description.content"></div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    texts: Array,
});
const title = props.texts?.find((text) => text.name === 'intro_title');
const description = props.texts?.find((text) => text.name === 'intro_content');
</script>
