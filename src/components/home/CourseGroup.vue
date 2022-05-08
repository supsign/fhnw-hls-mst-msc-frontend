<template>
    <div>
        <div class="mb-5 text-lg font-bold">
            {{ group.title }}
        </div>
        <div class="mb-5" v-html="group.description"></div>
        <div class="flex">
            <div class="w-[26rem] p-1 border-b font-bold">Module</div>
            <div class="w-10 border-b font-bold" v-if="group.courses">Type</div>
            <div class="flex gap-5 border-b">
                <div class="w-20 text-center font-bold">none</div>
                <div
                    v-for="(semester, index) in semesters"
                    :key="index"
                    class="w-20 text-center font-bold"
                    :title="semester.tooltip"
                >
                    {{ semester.short_name }}
                </div>
                <div class="w-20 text-center font-bold">later</div>
            </div>
        </div>
        <template v-if="group.specializations">
            <div v-for="(specialization, index) in group.specializations" :key="index">
                <div class="flex">
                    <div class="w-[26rem] p-1 border-x border-b font-bold">{{ specialization.name }}</div>
                    <div class="flex gap-5 border-b" v-if="semesters">
                        <div
                            v-for="index in semesters.length + 2"
                            :key="index"
                            class="w-20 text-center"
                            :class="{ 'border-r': index == semesters.length + 2 }"
                        ></div>
                    </div>
                </div>
                <Course
                    v-for="course in sortCourses(specialization.courses)"
                    :key="index"
                    :course="course"
                    further
                    :semesters="semesters"
                />
            </div>
        </template>
        <template v-if="group.clusters">
            <div v-for="(cluster, index) in group.clusters" :key="index">
                <div class="flex">
                    <div class="w-[26rem] p-1 border-x border-b font-bold">{{ cluster.name }}</div>
                    <div class="flex gap-5 border-b" v-if="semesters">
                        <div
                            v-for="index in semesters.length + 2"
                            :key="index"
                            class="w-20 text-center"
                            :class="{ 'border-r': index == semesters.length + 2 }"
                        ></div>
                    </div>
                </div>
                <Course
                    v-for="course in sortCourses(cluster.courses)"
                    :key="index"
                    :course="course"
                    further
                    :semesters="semesters"
                />
            </div>
        </template>
        <template v-if="group.courses">
            <div class="max-w-min">
                <Course
                    v-for="(course, index) in sortCourses(group.courses)"
                    :key="index"
                    :course="course"
                    :type="group.course_group_type_short_name"
                    :semesters="semesters"
                    :tooltip="group.tooltip"
                />
                <div
                    class="flex justify-end"
                    :class="[count < group.required_courses_count ? 'text-red-600' : 'text-green-600']"
                >
                    Required {{ count }}/{{ group.required_courses_count }}
                </div>
            </div>
        </template>
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { CourseGroup } from '../../interfaces/courseData.interface';
import { ICourse } from '../../interfaces/course.interface';
import { Semester } from '../../interfaces/semester.interface';
import { SelectedCourses } from '../../interfaces/selectedCourses.interface';
import Course from './Course.vue';
import { computed } from '@vue/reactivity';

const props = defineProps({
    group: { type: Object as PropType<CourseGroup>, required: true },
    semesters: Array as PropType<Array<Semester>>,
});

const emits = defineEmits();
function sortCourses(courses: Array<ICourse>) {
    return courses.sort((a, b) => a.semester_type - b.semester_type);
}

const count = computed(() => {
    if (props.group.courses) {
        let count = 0;
        for (let course of props.group.courses) {
            if (course.selected_semester) {
                count += 1;
            }
        }
        return count;
    }
    return null;
});
</script>
