<template>
    <div v-if="data" class="flex flex-col justify-center gap-5">
        <div class="text-lg font-bold">Personal Data</div>
        <Input label="Surname" />
        <Input label="Given Name" />
        <Select label="Semester" :options="data.semesters" v-model="semester" />
        <Select label="Study Mode" :options="data.studyMode.studyModes" options_label="label" v-model="studyMode" />
        <Select
            label="Specialization"
            :options="data.specializations"
            placeholder="-- Choose Specialization --"
            v-model="specialization"
            @change="getCourseData"
        />
    </div>
</template>
<script setup lang="ts">
import { onBeforeMount, Ref, ref } from 'vue';
import axios from 'axios';
import { PersonalDataResponse } from '../../interfaces/personalData.interface';
import { Semester } from '../../interfaces/semester.interface';

const emits = defineEmits(['getCourseData']);
const data = ref();
const semester: Ref<Semester> = ref();
const studyMode = ref();
const specialization = ref();

onBeforeMount(async () => {
    data.value = await getPersonalData();
    prefillValues(data.value);
});

async function getPersonalData() {
    const response = await axios.get('/personaldata');
    return response.data;
}
function prefillValues(data: PersonalDataResponse) {
    semester.value = data.semesters.length > 0 ? data.semesters[0] : '';
    studyMode.value = data.studyMode.studyModes[0];
    specialization.value = data.specializations[0];
}

function getCourseData() {
    emits('getCourseData', semester.value, studyMode.value, specialization.value);
}
</script>
