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
            optional_english: data.optionalCourses,
            additional_comments: data.additionalComments,
            statistics: data.statistics,
        };
    }
    return validator;
}

function parseMasterThesis(masterThesis: any) {
    console.log(masterThesis);
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
        specialization: groupsWithSelectedCourses[0].courses.length,
        cluster: groupsWithSelectedCourses[4].courses.length + groupsWithSelectedCourses[5].courses.length,
        core: groupsWithSelectedCourses[2].courses.length,
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
