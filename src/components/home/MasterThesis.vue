<template>
    <div v-if="data" class="flex flex-col gap-5">
        <div class="text-lg font-bold">Master Thesis</div>
        <Select
            label="Start of MSc Thesis"
            :options="data.time_frames"
            v-model="value.start"
            option_labels="start.long_name"
        />
        <div>
            <Select
                label="Start of MSc Thesis"
                :options="data.theses"
                v-model="value.theses"
                multiple
                :size="data.theses.length"
            />
            <div class="text-sm my-2">You may select multiple subject with CRTL</div>
        </div>
        <div>
            <label for="furtherDetails" class="px-1 bg-white text-gray-400"
                >Further Details on MSc Topic (optional)</label
            >
            <textarea
                id="furtherDetails"
                v-model="value.furtherDetails"
                class="block py-2 px-4 w-full box-border border rounded-lg border-gray-200 shadow-md text-gray-900"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import { PropType, computed, WritableComputedRef } from 'vue';
import { IThesisDataResponse, IThesisSelection } from '../../interfaces/theses.interface';
import Select from '../base/Select.vue';

const props = defineProps({
    data: Object as PropType<IThesisDataResponse>,
    modelValue: { type: Object as PropType<IThesisSelection>, required: true },
});
const emits = defineEmits(['update:modelValue']);

const value: WritableComputedRef<IThesisSelection> = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emits('update:modelValue', value);
    },
});
</script>
