<template>
    <div>
        <label v-if="label" for="input" class="px-1 bg-white text-gray-400" :title="tooltip">{{ label }}</label>
        <select
            id="select"
            class="block py-2 px-4 w-full box-border border rounded-lg border-gray-200 shadow-md text-gray-900"
            v-model="value"
            @change="emits('change')"
            v-bind="$attrs"
        >
            <template v-if="options.length > 0">
                <option v-if="placeholder" value="null" disabled selected>{{ placeholder }}</option>
                <option
                    v-for="(option, index) in options"
                    :key="index"
                    :value="option"
                    class="border-t border-gray-50 appearance-none"
                    :label="getLabel(option)"
                ></option>
            </template>
            <template v-else>
                <option class="border-t border-gray-50" disabled>No Options available</option>
            </template>
        </select>
    </div>
</template>
<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { PropType } from 'vue';
const props = defineProps({
    label: String,
    options: { type: Array as PropType<Array<any>>, required: true },
    option_labels: String,
    placeholder: String,
    modelValue: Object as PropType<any>,
    tooltip: String,
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

function getLabel(option: any) {
    console.log(option);
    if (!props.option_labels) {
        return option['name'];
    }
    const strings = props.option_labels.split('.').map((s) => [s]);
    console.log(strings);
    if (strings.length === 1) {
        //@ts-ignore
        return option[strings[0]];
    } else {
        //@ts-ignore
        return option[strings[0]][strings[1]];
    }
}
</script>
