<template>
    <div v-if="data" class="flex flex-col justify-center gap-5">
        <div class="text-lg font-bold">Personal Data</div>
        <Input label="Surname" v-model="surname" />
        <Input label="Given Name" v-model="givenName" />
        <Select label="Semester" :options="data.semesters" v-model="semester" @change="getCourseData" />
        <Select
            label="Study Mode"
            :options="data.studyMode.studyModes"
            options_label="label"
            v-model="studyMode"
            @change="getCourseData"
        />
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
import { StudyMode } from '../../interfaces/studyMode.interface';
import { Specialization } from '../../interfaces/specialization.interface';

const emits = defineEmits(['getCourseData']);

const data = ref();
const surname = ref('');
const givenName = ref('');
const semester: Ref<Semester | undefined> = ref();
const studyMode = ref();
const specialization: Ref<Specialization | undefined> = ref();

onBeforeMount(async () => {
    data.value = await getPersonalData();
    prefillValues(data.value);
});

async function getPersonalData(): Promise<PersonalDataResponse> {
    const response = await axios.get('/personaldata');
    return response.data;
}
function prefillValues(data: PersonalDataResponse) {
    semester.value = data.semesters.length > 0 ? data.semesters[0] : undefined;
    studyMode.value = data.studyMode.studyModes[0];
}

function getCourseData() {
    if (!semester.value || !studyMode.value || !specialization.value) {
        return;
    }
    emits('getCourseData', semester.value, studyMode.value, specialization.value);
}
</script>
