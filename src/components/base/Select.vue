<template>
    <div>
        <label v-if="label" for="input" class="px-1 bg-white text-gray-400">{{ label }}</label>
        <select
            id="select"
            class="block py-2 px-4 w-full box-border border rounded-lg border-gray-200 shadow-md text-gray-900"
        >
            <template v-if="options.length > 0">
                <option v-for="(option, index) in options" :key="index" :value="option" class="border-t border-gray-50">
                    {{ option['optios_label'] }}
                </option>
            </template>
            <template v-else>
                <option class="border-t border-gray-50" disabled>No Options available</option>
            </template>
        </select>
    </div>
</template>
<script setup lang="ts">
import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select';

const props = defineProps({
    label: String,
    options: { type: Array, required: true },
    options_label: String,
});
</script>
