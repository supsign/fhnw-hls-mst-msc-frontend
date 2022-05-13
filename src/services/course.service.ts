import { ISlot, SemesterWithOverlappingCourses } from '../interfaces/course.interface';
import { ISemester } from '../interfaces/semester.interface';

export function getOverlappingCourses(semestersWithCourses: ISemester[], slots: ISlot[]) {
    const semesterWithOverlappingCourses: SemesterWithOverlappingCourses[] = [];
    semestersWithCourses.forEach((semester, index) => {
        semesterWithOverlappingCourses.push({ semester, courses: [] });
        for (let slot of slots) {
            const slotCourses = semester.courses.filter((course) => course.slot_id === slot.id);
            if (slotCourses.length > 1) {
                semesterWithOverlappingCourses[index].courses.push(slotCourses);
            }
        }
    });

    return semesterWithOverlappingCourses;
}
