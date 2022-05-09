import { validateData } from '../helpers/validation';
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
    groupsWithSelectedCourses: any;
}

export function pdfDataService(data: pdfDataServiceInput) {
    data.selectedCourses = parseSelectedCoursesForPdf(data.semestersWithCourses);
    data.statistics = getStatistics(data.groupsWithSelectedCourses, data.ects);
    data.masterThesis = parseMasterThesis(JSON.parse(JSON.stringify(data.masterThesis)));
    const validator = validateData(data);

    if (!validator.amount) {
        delete data.statistics.moduleGroupCount;
        return {
            surname: data.surname,
            given_name: data.givenName,
            semester: data.semester?.id,
            study_mode: data.studyMode?.id,
            specialization: data.specialization?.id,
            selected_courses: data.selectedCourses,
            modules_outside: data.outsideModules,
            double_degree: data.doubleDegree,
            master_thesis: data.masterThesis,
            optional_courses: [data.optionalCourses],
            additional_comments: data.additionalComments,
            statistics: data.statistics,
        };
    }
    return validator;
}

function parseMasterThesis(masterThesis: any) {
    if (!masterThesis || !masterThesis.hasOwnProperty('start') || !masterThesis.theses.length) {
        return null;
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

function getStatistics(groupsWithSelectedCourses: any, ects: number) {
    return {
        specialization: getSpecializationCount(groupsWithSelectedCourses),
        cluster: getClusterSpecificModulesCount(groupsWithSelectedCourses),
        core: getCoreCompetenceModulesCount(groupsWithSelectedCourses),
        ects: ects,
        moduleGroupCount: getModuleGroupCount(groupsWithSelectedCourses),
    };
}

function getModuleGroupCount(groupsWithSelectedCourses: any) {
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

function getSpecializationCount(groupsWithSelectedCourses: any) {
    const group = groupsWithSelectedCourses.find((group) => {
        if (group.type === 1 && group.hasOwnProperty('id')) {
            return group;
        }
    });
    return group.courses.length;
}

function getCoreCompetenceModulesCount(groupsWithSelectedCourses: any) {
    const group = groupsWithSelectedCourses.find((group) => {
        if (group.type === 3 && group.hasOwnProperty('id')) {
            return group;
        }
    });
    return group.courses.length;
}

function getClusterSpecificModulesCount(groupsWithSelectedCourses: any) {
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
