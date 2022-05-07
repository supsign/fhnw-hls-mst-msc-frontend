<template>
    <div>
        <div class="mb-5 text-lg font-bold">Modules outside the Curriculum</div>
        <div v-html="description.content" class="mb-5"></div>
        <div class="flex flex-col gap-5">
            <div v-for="(module, index) in outsideModules" :key="index" class="flex gap-10">
                <Input label="Module Title" v-model="module.title" />
                <Input label="ECTS" type="number" v-model="module.ects" />
                <Input label="University" v-model="module.university" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { whenever } from '@vueuse/core';
import { Ref, ref } from 'vue';
import { OutsideModule } from '../../interfaces/outsideModule.interface';
const props = defineProps({
    texts: Array,
});
const emits = defineEmits(['updateModulesOutsideData']);
const description = props.texts?.find((text) => text.name === 'modules_outside_description');
const outsideModules: Ref<Array<OutsideModule>> = ref([]);

function prefill() {
    outsideModules.value.push({ title: undefined, ects: undefined, university: undefined });
}
prefill();

whenever(outsideModules.value, (value: Array<OutsideModule>) => {
    const lastItem = value[value.length - 1];
    if (lastItem.title && lastItem.ects && lastItem.university) {
        outsideModules.value.push({ title: undefined, ects: undefined, university: undefined });
        emits('updateModulesOutsideData', outsideModules.value);
    }
});
</script>
