<template>
    <div v-if="data" class="flex flex-col justify-center gap-5">
        <div class="text-lg font-bold">Personal Data</div>
        <Input label="Surname" v-model="personalData.surname" />
        <Input label="Given Name" v-model="personalData.givenName" />
        <Select label="Semester" :options="data.semesters" v-model="personalData.semester" />
        <Select
            :title="data.studyMode.tooltip"
            label="Study Mode"
            :options="data.studyMode.studyModes"
            options_label="label"
            v-model="personalData.studyMode"
        />
        <Select
            label="Specialization"
            :options="data.specializations"
            placeholder="-- Choose Specialization --"
            v-model="personalData.specialization"
        />
    </div>
</template>
<script setup lang="ts">
import { onBeforeMount, Ref, ref } from 'vue';
import axios from 'axios';
import { PersonalDataResponse, PersonalData } from '../../interfaces/personalData.interface';
import { whenever } from '@vueuse/core';
import Input from '../base/Input.vue';
import Select from '../base/Select.vue';

const emits = defineEmits(['getCourseData', 'updatePersonalData']);

const data = ref();
const personalData: Ref<PersonalData> = ref({
    surname: '',
    givenName: '',
    semester: undefined,
    studyMode: undefined,
    specialization: undefined,
});

onBeforeMount(async () => {
    data.value = await getPersonalData();
    prefillValues(data.value);
});

whenever(personalData.value, () => {
    emits('updatePersonalData', personalData.value);
});

async function getPersonalData(): Promise<PersonalDataResponse> {
    const response = await axios.get('/personaldata');
    return response.data;
}
function prefillValues(data: PersonalDataResponse) {
    personalData.value.semester = data.semesters.length > 0 ? data.semesters[0] : undefined;
    personalData.value.studyMode = data.studyMode.studyModes[0];
}
</script>
