<template>
    <Select label="Start of MSc Thesis" :options="data.semesters" v-model="semester" @change="getCourseData" />
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { Theses } from '../../interfaces/theses.interface';
const props = defineProps({
    data: Object as PropType<Theses>,
});
</script>
