import api from "./api";

const route = "CoursesStudents/";

export function getCoursesStudents(courseId, studentId) {
    return api.get(`${route}`, {courseId, studentId});
}

export function postCoursesStudents(courseId, studentId) {
    return api.post(`${route}`, { courseId, studentId });
}

export function deleteCoursesStudents(courseId, studentId) {
    return api.delete(`${route}`, { courseId, studentId });
}