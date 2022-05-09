import { validateData } from '../helpers/validation';
import { ICourseGroup } from '../interfaces/course.interface';
import { IModuleOutside } from '../interfaces/moduleOutside.interface';
import { IPersonalData } from '../interfaces/personal.interface';
import { ISemester } from '../interfaces/semester.interface';
import { ISpecialization } from '../interfaces/specialization.interface';
import { IStudyMode } from '../interfaces/studyMode.interface';
import { IThesisSelection, IThesisTimeFrame } from '../interfaces/theses.interface';

interface pdfDataServiceInput {
    personalData: IPersonalData;
    semestersWithCourses: ISemester[];
    modulesOutside: IModuleOutside[];
    doubleDegree: boolean;
    masterThesis: IThesisSelection;
    optionalCourses: ISemester[];
    additionalComments: string;
    ects: number;
    groupsWithSelectedCourses: ICourseGroup[];
}
interface parsedPdfDataInput {
    surname: string;
    given_name: string;
    semester: ISemester;
    study_mode: IStudyMode;
    specialization: ISpecialization;
    selected_courses: ISelectedCoursesForPdf[];
    modules_outside: IModuleOutside[];
    double_degree: boolean;
    master_thesis: IThesisForPdf | null;
    optional_courses: ISelectedCoursesForPdf[];
    additional_comments: string;
    statistics: IStatistics;
}
interface ISelectedCoursesForPdf {
    semesterId: number;
    courses: number[];
}

interface IThesisForPdf {
    time_frame: IThesisTimeFrame;
    theses: number[];
    further_details: string;
}
interface IStatistics {
    specialization: number;
    cluster: number;
    core: number;
    ects: number;
    moduleGroupCount: any;
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
        optional_courses: parseOptionalCoursesForPdf(data.optionalCourses),
        additional_comments: data.additionalComments,
        statistics: getStatistics(data.groupsWithSelectedCourses, data.ects),
    };
    const validator = validateData(parsedData);

    if (!validator.amount) {
        delete parsedData.statistics.moduleGroupCount;
        return parsedData;
    }
    return validator;
}
function parseMasterThesis(masterThesis: IThesisSelection): IThesisForPdf | null {
    if (!masterThesis || !masterThesis.hasOwnProperty('start') || !masterThesis.theses.length) {
        return null;
    }
    return {
        //@ts-ignore
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
            semesterId: semester.id,
            courses: semester.courses.map((course) => {
                return course.id;
            }),
        };
    });
}
function parseOptionalCoursesForPdf(semestersWithCourses: ISemester[]): ISelectedCoursesForPdf[] {
    return semestersWithCourses.map((semester) => {
        return {
            semesterId: semester.id,
            courses: semester.courses.map((course) => {
                return course.id;
            }),
        };
    });
}

function getStatistics(groupsWithSelectedCourses: ICourseGroup[], ects: number) {
    return {
        specialization: getSpecializationCount(groupsWithSelectedCourses),
        cluster: getClusterSpecificModulesCount(groupsWithSelectedCourses),
        core: getCoreCompetenceModulesCount(groupsWithSelectedCourses),
        ects: ects,
        moduleGroupCount: getModuleGroupCount(groupsWithSelectedCourses),
    };
}

function getModuleGroupCount(groupsWithSelectedCourses: ICourseGroup[]) {
    const filterModules = groupsWithSelectedCourses.filter((group) => {
        if (group.hasOwnProperty('id')) {
            return group;
        }
    });
    return filterModules.map((module) => {
        module.count = module.courses.length;
        return module;
    });
}

function getSpecializationCount(groupsWithSelectedCourses: ICourseGroup[]) {
    const group = groupsWithSelectedCourses.find((group) => {
        if (group.type === 1 && group.hasOwnProperty('id')) {
            return group;
        }
    });
    if (group) {
        return group.courses.length;
    }
    return 0;
}

function getCoreCompetenceModulesCount(groupsWithSelectedCourses: ICourseGroup[]) {
    const group = groupsWithSelectedCourses.find((group) => {
        if (group.type === 3 && group.hasOwnProperty('id')) {
            return group;
        }
    });
    if (group) {
        return group.courses.length;
    }
    return 0;
}

function getClusterSpecificModulesCount(groupsWithSelectedCourses: ICourseGroup[]) {
    const groups = groupsWithSelectedCourses.filter((group) => {
        if (group.type === 4) {
            return group;
        }
    });
    let count = 0;
    for (let group of groups) {
        count += group.courses.length;
    }
    return count;
}
