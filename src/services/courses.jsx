import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "Courses/"
});

// ----- create service object
export const coursesService = {
    get: function () {
        return api.get();
    },
    getById: function (id) {
        return api.get(`${id}`);
    },
    getByStudent: function (id) {
        return api.get(`/byStudent`, { params: { id } });
    },
    getByTeacher: function (id) {
        return api.get(`/byTeacher`, { params: { id } });
    },
    create: function (model) {
        return api.post("", model);
    },
    delete: function (id) {
        return api.delete(`${id}`);
    },
    edit: function (model) {
        return api.put("", model);
    }
}