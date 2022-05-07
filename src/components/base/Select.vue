<template>
    <div>
        <label v-if="label" for="input" class="px-1 bg-white text-gray-400">{{ label }}</label>
        <select
            id="select"
            class="block py-2 px-4 w-full box-border border rounded-lg border-gray-200 shadow-md text-gray-900"
            v-model="value"
            @change="emits('change')"
            v-bind="$attrs"
        >
            <template v-if="options.length > 0">
                <option v-if="placeholder" value="undefined" disabled selected>{{ placeholder }}</option>
                <option v-for="(option, index) in options" :key="index" :value="option" class="border-t border-gray-50">
                    {{ options_label ? option[options_label] : option['name'] }}
                </option>
            </template>
            <template v-else>
                <option class="border-t border-gray-50" disabled>No Options available</option>
            </template>
        </select>
    </div>
</template>
<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { ref } from 'vue';

const props = defineProps({
    label: String,
    options: { type: Array, required: true },
    options_label: String,
    placeholder: String,
    modelValue: Object,
});

const emits = defineEmits(['change', 'update:modelValue']);

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emits('update:modelValue', value);
    },
});
</script>
