import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "Students"
});

// ----- create service object
export const studentsService = {
    get: function () {
        return api.get();
    },
    getById: function (id) {
        return api.get(`${id}`);
    },
    getByCourse: function (id) {
        return api.get(`byCourse`, id);
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