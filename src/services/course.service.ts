import { ISlot } from '../interfaces/course.interface';
import { ISemester } from '../interfaces/semester.interface';

export function checkOverlappingCourses(semestersWithCourses: ISemester[], slots: ISlot[]) {
    console.log(slots);
    const doubleStore = [];
    for (let semester of semestersWithCourses) {
        for (let slot of slots) {
            const slotCourses = semester.courses.filter((course) => course.slot_id === slot.id);
            if (slotCourses.length > 1) {
                doubleStore.push(slotCourses);
            }
        }
    }
    return doubleStore.sort((a, b) => {
        return a[0].start_semester_id - b[0].start_semester_id;
    });
}
