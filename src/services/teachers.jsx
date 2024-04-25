import api from "./api";

const route = "Teachers/";

export function getTeachers() {
    return api.get(`${route}`);
}

export function getTeacher(id) {
    return api.get(`${route}/${id}`);
}

export function deleteTeacher(id) {
    return api.delete(`${route}/${id}`);
}

export function postTeacher(teacher) {
    return api.post(`${route}`, { teacher });
}

export function putTeacher(teacher) {
    return api.put(`${route}`, { teacher });
}