import api from "./api";

const route = "Courses/";

export function getCourses() {
    return api.get(`${route}`);
}

export function getCourse(id) {
    return api.get(`${route}/${id}`);
}

export function deleteCourse(id) {
    return api.delete(`${route}/${id}`);
}

export function postCourse(course) {
    return api.post(`${route}`, { course });
}

export function putCourse(course) {
    return api.put(`${route}`, { course });
}


export function getCoursesByStudent(id) {
    return api.get(`${route}/byStudent`, {id});
}

export function getCoursesByTeacher(id) {
    return api.get(`${route}/byTeacher`, {id});
}