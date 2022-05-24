import { validateData } from '../helpers/validation';
import { ICourseGroup, ISemesterWithOverlappingCourses } from '../interfaces/course.interface';
import { IModuleOutside } from '../interfaces/moduleOutside.interface';
import { IPersonalData } from '../interfaces/personal.interface';
import { ISemester } from '../interfaces/semester.interface';
import { ISpecialization } from '../interfaces/specialization.interface';
import { IStatistics } from '../interfaces/statistics.interface';
import { IStudyMode } from '../interfaces/studyMode.interface';
import { IThesisSelection, IThesisTimeFrame } from '../interfaces/theses.interface';

interface pdfDataServiceInput {
    personalData: IPersonalData;
    semestersWithCourses: ISemester[];
    modulesOutside: IModuleOutside[];
    doubleDegree: boolean;
    masterThesis: IThesisSelection;
    additionalComments: string;
    statistics: IStatistics;
    groupsWithSelectedCourses: ICourseGroup[];
    overlappingCourses: ISemesterWithOverlappingCourses[];
}
export interface parsedPdfDataInput {
    surname: string;
    given_name: string;
    semester: ISemester;
    study_mode: IStudyMode;
    specialization: ISpecialization;
    selected_courses: ISelectedCoursesForPdf[];
    modules_outside: IModuleOutside[];
    double_degree: boolean;
    master_thesis: IThesisForPdf | null;
    additional_comments: string;
    statistics: IStatistics;
}
interface ISelectedCoursesForPdf {
    semesterId: number | string;
    courses: number[];
}

interface IThesisForPdf {
    time_frames: IThesisTimeFrame;
    theses: number[];
    further_details: string;
}

export function pdfDataService(data: pdfDataServiceInput) {
    const parsedData: parsedPdfDataInput = {
        surname: data.personalData.surname,
        given_name: data.personalData.givenName,
        //@ts-ignore
        semester: data.personalData.semester?.id,
        //@ts-ignore
        study_mode: data.personalData.studyMode?.id,
        //@ts-ignore
        specialization: data.personalData.specialization?.id,
        selected_courses: parseSelectedCoursesForPdf(data.semestersWithCourses),
        modules_outside: data.modulesOutside,
        double_degree: data.doubleDegree,
        master_thesis: parseMasterThesis(JSON.parse(JSON.stringify(data.masterThesis))),
        additional_comments: data.additionalComments,
        statistics: data.statistics,
        overlapping_courses: parseOverlappingCourses(data.overlappingCourses),
    };
    const validator = validateData(parsedData);

    if (!validator.amount) {
        parsedData.statistics.moduleGroupCount = [];
        return parsedData;
    }
    return validator;
}
function parseMasterThesis(masterThesis: IThesisSelection): IThesisForPdf | null {
    if (!masterThesis || !masterThesis.hasOwnProperty('start') || !masterThesis.theses.length) {
        return null;
    }
    return {
        time_frames: masterThesis.start,
        theses: masterThesis.theses.map((theses) => {
            return theses.id;
        }),
        further_details: masterThesis.furtherDetails,
    };
}

function parseSelectedCoursesForPdf(semestersWithCourses: ISemester[]): ISelectedCoursesForPdf[] {
    return semestersWithCourses.map((semester) => {
        return {
            semesterId: semester.id ? semester.id : semester.name,
            courses: semester.courses.map((course) => {
                return course.id;
            }),
        };
    });
}
function parseOverlappingCourses(semesterWithOverlappingCourses: ISemesterWithOverlappingCourses[]) {
    return semesterWithOverlappingCourses
        .map((obj) => {
            return {
                semesterId: obj.semester.hasOwnProperty('id') ? obj.semester.id : obj.semester.name,
                courses: obj.courses.map((coursePair) => {
                    return coursePair.map((course) => {
                        return course.id;
                    });
                }),
            };
        })
        .filter((obj) => {
            if (obj.courses.length > 0) return obj;
        });
}
