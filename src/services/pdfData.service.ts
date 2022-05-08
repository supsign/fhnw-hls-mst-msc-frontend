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
    semestersWithCourses: any;
    ects: number;
}

export function pdfDataService(data: pdfDataServiceInput) {
    return {
        surname: data.surname,
        given_name: data.givenName,
        semester: data.semester?.id,
        study_mode: data.studyMode?.id,
        specialization: data.specialization?.id,
        selected_courses: parseSelectedCoursesForPdf(data.semestersWithCourses),
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

function parseSelectedCoursesForPdf(semestersWithCourses: any) {
    return semestersWithCourses.map((semester) => {
        return {
            semesterId: semester.id,
            courses: semester.courses.map((course) => {
                return course.id;
            }),
        };
    });
}
