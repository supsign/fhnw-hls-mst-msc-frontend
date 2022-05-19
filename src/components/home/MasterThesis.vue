<template>
    <div v-if="data" class="flex flex-col gap-5">
        <div class="text-lg font-bold">Master Thesis</div>
        <Select
            label="Start of MSc Thesis"
            :options="data.time_frames"
            v-model="value.start"
            option_labels="start.long_name"
        />
        <div v-if="text" v-html="text.content"></div>
        <div>
            <Select
                label="Subject of the MSc Thesis"
                :options="data.theses"
                v-model="value.theses"
                multiple
                :size="data.theses.length"
            />
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
import { IText } from '../../interfaces/text.interface';
import { IThesisDataResponse, IThesisSelection } from '../../interfaces/theses.interface';
import Select from '../base/Select.vue';

const props = defineProps({
    data: { type: Object as PropType<IThesisDataResponse>, required: true },
    modelValue: { type: Object as PropType<IThesisSelection>, required: true },
});

const emits = defineEmits(['update:modelValue']);

const text: IText | null = props.data.texts.find((text) => text.name === 'thesis_text') || null;

const value: WritableComputedRef<IThesisSelection> = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emits('update:modelValue', value);
    },
});
</script>
