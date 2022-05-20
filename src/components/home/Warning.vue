<template>
    <div class="shadow-xl bg-orange-400 p-2 rounded-md">
        <div class="font-bold text-lg mb-3">Warning</div>
        <div class="flex flex-col">
            <div class="flex gap-10 flex-wrap" v-if="semestersWithOverlappingCourses.length">
                <div class="font-bold mb-3">Overlapping Courses</div>
                <div v-for="(semester, index) in semestersWithOverlappingCourses" :key="index">
                    <div v-if="semester.courses.length">
                        <div class="font-bold">
                            {{ semester.semester.short_name ? semester.semester.short_name : semester.semester.name }}
                        </div>
                        <div v-for="(courses, index) in semester.courses" :key="index" class="mb-5">
                            <div v-for="(course, index) in courses" :key="index">- {{ course.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="selectedLaterCount">
                <div class="font-bold mb-3">
                    You have selected modules with the undefined semester ('later'). Please correct for a final study
                    plan
                </div>
            </div>
            <template v-if="blockCoursesAtEndOfSemester">
                <div v-if="blockCoursesAtEndOfSemester.courses.length" class="font-bold">
                    <template v-for="(course, index) in blockCoursesAtEndOfSemester.courses">
                        Module {{ course.name
                        }}<template
                            v-if="blockCoursesAtEndOfSemester && index < blockCoursesAtEndOfSemester.courses.length - 1"
                            >,
                        </template>
                    </template>
                    <template v-if="blockCoursesAtEndOfSemester.courses.length === 1"> is a block course</template
                    ><template v-else> are block courses</template> at the end of
                    {{ blockCoursesAtEndOfSemester.long_name }}. Please consider taking another module as this might
                    interfere with the start of your MSc thesis. A later start of the MSc thesis is possible but entails
                    registering for another semester and the payment of an additional semester fee.
                </div></template
            >
        </div>
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import { ICourse, ISemesterWithOverlappingCourses } from '../../interfaces/course.interface';
import { ISemester } from '../../interfaces/semester.interface';
const props = defineProps({
    semestersWithOverlappingCourses: {
        type: Array as PropType<Array<ISemesterWithOverlappingCourses>>,
        required: true,
    },
    selectedLaterCount: Number,
    blockCoursesAtEndOfSemester: { type: Object as PropType<ISemester | null>, required: true },
});
</script>
