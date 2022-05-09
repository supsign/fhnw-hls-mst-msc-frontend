<template>
    <div>
        <div class="mb-5 text-lg font-bold">Double Degree Option</div>
        <div v-if="description" v-html="description.content" class="mb-7"></div>
        <div class="flex">
            <input
                type="checkbox"
                :value="modelValue"
                @input="$emit('update:modelValue', !modelValue)"
                class="h-7 w-7 box-border border rounded-lg border-gray-200 shadow-md"
            />
            <label class="ml-2">I'm interested in the Double-Degree option</label>
        </div>
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { IText } from '../../interfaces/text.interface';

const props = defineProps({
    texts: { type: Array as PropType<Array<IText>>, required: true },
    modelValue: Boolean,
});

defineEmits(['update:modelValue']);

const description: IText | null = props.texts.find((text) => text.name === 'double_degree_description') || null;
</script>
