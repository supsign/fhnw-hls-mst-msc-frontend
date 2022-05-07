<template>
    <div class="flex hover:bg-gray-50">
        <div class="w-[26rem] border-b border-l border-r p-1">
            {{ course.name }}
        </div>
        <div class="w-10 border-r border-b p-1" v-if="!further">
            {{ type }}
        </div>
        <div class="border-b flex gap-5">
            <div class="w-20 text-center flex justify-center">
                <input
                    type="radio"
                    class="h-5 w-5 my-auto"
                    v-model="selectedSemester"
                    value="none"
                    @change="addCourse"
                />
            </div>
            <div v-for="(semester, index) in semesters" :key="index" class="w-20 text-center flex justify-center">
                <input
                    type="radio"
                    class="h-5 w-5 my-auto"
                    v-model="selectedSemester"
                    :value="semester.id"
                    @change="addCourse"
                />
            </div>
            <div class="w-20 text-center flex justify-center border-r">
                <input
                    type="radio"
                    class="h-5 w-5 my-auto"
                    v-model="selectedSemester"
                    value="later"
                    @change="addCourse"
                />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { inject, PropType, Ref, ref } from 'vue';
import { Course } from '../../interfaces/courseData.interface';
import { Semester } from '../../interfaces/semester.interface';

const props = defineProps({
    course: { type: Object as PropType<Course>, required: true },
    type: String,
    further: Boolean,
});
const emits = defineEmits(['addCourse']);

const semesters: Array<Semester> | undefined = inject('semesters');

const selectedSemester: Ref<String | Number> = ref('none');

function addCourse() {
    emits('addCourse', props.course.id, selectedSemester.value);
}
</script>
