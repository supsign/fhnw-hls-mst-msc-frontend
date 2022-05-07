<template>
    <div>
        <div class="mb-5 text-lg font-bold">Double Degree Option</div>
        <div v-html="description.content" class="mb-7"></div>
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
const props = defineProps({
    texts: Array,
    modelValue: Boolean,
});
defineEmits(['update:modelValue']);
const description = props.texts?.find((text) => text.name === 'double_degree_description');
</script>
