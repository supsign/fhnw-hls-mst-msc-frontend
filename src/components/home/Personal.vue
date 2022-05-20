<template>
    <div v-if="data" class="flex flex-col justify-center gap-5">
        <Introduction :texts="data.texts" />
        <div class="text-lg font-bold">Personal Data</div>
        <Input label="Surname" v-model="value.surname" />
        <Input label="Given Name" v-model="value.givenName" />
        <Select
            label="Semester"
            :options="data.semesters"
            v-model="value.semester"
            @change="emits('getCourseData')"
            option_labels="long_name_with_short"
        />
        <Select
            label="Study Mode"
            :options="data.studyMode.studyModes"
            option_labels="label"
            v-model="value.studyMode"
            :tooltip="data.studyMode.tooltip"
            @change="emits('getCourseData')"
        />
        <Select
            label="Specialization"
            :options="data.specializations"
            placeholder="-- Choose Specialization --"
            v-model="value.specialization"
            @change="emits('getCourseData')"
        />
    </div>
</template>
<script setup lang="ts">
import { onBeforeMount, PropType, ref, WritableComputedRef, computed } from 'vue';
import axios from 'axios';
import { IPersonalDataResponse, IPersonalData } from '../../interfaces/personal.interface';
import Input from '../base/Input.vue';
import Select from '../base/Select.vue';
import Introduction from './Introduction.vue';

const props = defineProps({
    modelValue: { type: Object as PropType<IPersonalData>, required: true },
});
const emits = defineEmits(['getCourseData', 'update:modelValue']);

const data = ref();

const value: WritableComputedRef<IPersonalData> = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emits('update:modelValue', value);
    },
});

onBeforeMount(async () => {
    data.value = await getPersonalData();
    prefillValues(data.value);
});

async function getPersonalData() {
    const response = await axios.get<IPersonalDataResponse>('/personaldata');
    return response.data;
}

function prefillValues(data: IPersonalDataResponse) {
    value.value.semester = data.semesters.length > 0 ? data.semesters[0] : null;
    value.value.studyMode = data.studyMode.studyModes[0];
}
</script>
