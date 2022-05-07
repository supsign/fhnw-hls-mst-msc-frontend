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
        <div>
            <label for="furtherDetails" class="px-1 bg-white text-gray-400">Further Details</label>
            <textarea
                id="furtherDetails"
                v-model="value.furtherDetails"
                class="block py-2 px-4 w-full box-border border rounded-lg border-gray-200 shadow-md text-gray-900"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { PropType } from 'vue';
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
