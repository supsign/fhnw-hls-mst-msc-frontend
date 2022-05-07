<template>
    <div v-if="data" class="flex flex-col gap-5">
        <div class="text-lg font-bold">Master Thesis</div>
        <Select label="Start of MSc Thesis" :options="data.starts" v-model="value.start" />
        <Select
            label="Start of MSc Thesis"
            :options="data.theses"
            v-model="value.theses"
            multiple
            :size="data.theses.length"
        />
    </div>
</template>
<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { PropType, ref, WritableComputedRef } from 'vue';
import { Theses, ThesesSelection } from '../../interfaces/theses.interface';

const props = defineProps({
    data: Object as PropType<Theses>,
    modelValue: Object,
});
const emits = defineEmits(['update:modelValue']);

const value = computed<ThesesSelection>({
    get() {
        return props.modelValue;
    },
    set(value) {
        emits('update:modelValue', value);
    },
});
</script>
