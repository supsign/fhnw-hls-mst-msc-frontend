<template>
    <div>
        <div class="mb-5 text-lg font-bold">Modules outside the Curriculum</div>
        <div v-if="description" v-html="description.content" class="mb-5"></div>
        <div class="flex flex-col gap-5">
            <div v-for="(module, index) in modulesOutsideArray" :key="index" class="flex gap-10">
                <Input label="Module Title" v-model="module.title" />
                <NumberInput label="ECTS" type="number" :min="0" v-model="module.ects" />
                <Input label="University" v-model="module.university" />
                <div
                    v-if="index"
                    @click="modulesOutsideArray.splice(index, 1)"
                    class="transition transform duration-300 ease-in-out text-white py-1 px-4 rounded-md shadow-sm bg-red-600 hover:bg-red-700 hover:shadow-xl cursor-pointer h-10 flex items-center mt-6"
                >
                    Remove
                </div>
            </div>
            <div>
                <button
                    @click="addNewModule"
                    class="transition transform duration-300 ease-in-out text-white py-1 px-4 rounded-md shadow-sm bg-blue-700 hover:bg-blue-800 hover:shadow-xl cursor-pointer"
                >
                    New Module
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { whenever } from '@vueuse/core';
import { PropType, Ref, ref } from 'vue';
import { IModuleOutside } from '../../interfaces/moduleOutside.interface';
import { IText } from '../../interfaces/text.interface';
import Input from '../base/Input.vue';
import NumberInput from '../base/NumberInput.vue';
const props = defineProps({
    texts: { type: Array as PropType<Array<IText>>, required: true },
});
const emits = defineEmits(['updateModulesOutsideData']);
const description: IText | null = props.texts.find((text) => text.name === 'modules_outside_description') || null;
const modulesOutsideArray: Ref<Array<IModuleOutside>> = ref([{ title: '', ects: 0, university: '' }]);

function addNewModule() {
    modulesOutsideArray.value.push({ title: '', ects: 0, university: '' });
}
// @ts-ignore
whenever(modulesOutsideArray.value, (value) => {
    emits('updateModulesOutsideData', value);
});
</script>
