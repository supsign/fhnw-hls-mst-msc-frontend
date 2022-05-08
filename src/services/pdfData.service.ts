import { CourseDataResponse, CourseGroup } from '../interfaces/courseData.interface';
import { OutsideModule } from '../interfaces/outsideModule.interface';
import { Semester } from '../interfaces/semester.interface';
import { Specialization } from '../interfaces/specialization.interface';
import { StudyMode } from '../interfaces/studyMode.interface';
import { Theses, ThesesSelection } from '../interfaces/theses.interface';

interface pdfDataServiceInput {
    surname: string;
    givenName: string;
    semester: Semester;
    studyMode: StudyMode;
    specialization: Specialization;
    courseData: CourseDataResponse;
    outsideModules: OutsideModule;
    doubleDegree: Boolean;
    masterThesis: ThesesSelection;
    optionalCourses: any;
    additionalComments: string;
    ects: number;
}

export function pdfDataService(data: pdfDataServiceInput) {
    return {
        surname: data.surname,
        given_name: data.givenName,
        semester: data.semester?.id,
        study_mode: data.studyMode?.id,
        specialization: data.specialization?.id,
        selected_courses: parseSelectedCoursesForPdf(data.courseData),
        modules_outside: data.outsideModules,
        double_degree: data.doubleDegree,
        master_thesis: parseMasterThesis(data.masterThesis),
        optional_english: data.optionalCourses,
        additional_comments: data.additionalComments,
        ects: data.ects,
    };
}

function parseMasterThesis(masterThesis: any) {
    if (!masterThesis) {
        return masterThesis;
    }
    return {
        start: masterThesis.start.id,
        theses: masterThesis.theses.map((theses) => {
            return theses.id;
        }),
        further_details: masterThesis.furtherDetails,
    };
}

function getSemestersWithCourses(courseData: CourseDataResponse) {
    const moduleGroup = courseData.courses[0].map((group) => {
        const selected = group.courses.map((course) => {
            if (course.selected_semester) {
                return {
                    semesterId: course.selected_semester.id ? course.selected_semester.id : course.selected_semester,
                    course: course,
                };
            }
            return null;
        });
        const filterUsedSelected = selected.filter((select) => {
            if (select) {
                return select;
            }
        });

        return filterUsedSelected;
    });

    const collection = [];
    for (let arr of moduleGroup) {
        for (let item of arr) {
            collection.push(item);
        }
    }

    const semestersWithEmptyCourses = [];
    for (let coll of collection) {
        if (semestersWithEmptyCourses.findIndex((item) => item.semesterId === coll?.semesterId) === -1) {
            semestersWithEmptyCourses.push({ semesterId: coll?.semesterId, courses: [] });
        }
    }
    for (let semester of semestersWithEmptyCourses) {
        const collect = collection.filter((col) => col?.semesterId === semester.semesterId);
        semester.courses.push(collect.map((col) => col?.course));
    }
    console.log(semestersWithEmptyCourses);
    return;
}

function parseSelectedCoursesForPdf(courseData: CourseDataResponse) {
    const semestersWithCourses = getSemestersWithCourses(courseData);
    console.log(semestersWithCourses);
    const test = semestersWithCourses.map((item) => {
        return item.courses.map((course) => {
            return JSON.parse(JSON.stringify(course));
        });
    });
}
