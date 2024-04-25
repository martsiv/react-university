import api from "./api";

const route = "Students/";

export function getStudents() {
    return api.get(`${route}`);
}

export function getStudent(id) {
    return api.get(`${route}/${id}`);
}

export function deleteStudent(id) {
    return api.delete(`${route}/${id}`);
}

export function postStudent(student) {
    return api.post(`${route}`, { student });
}

export function putStudent(student) {
    return api.put(`${route}`, { student });
}


export function getStudentsByCourse(id) {
    return api.get(`${route}/byCourse`, {id});
}