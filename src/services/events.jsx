import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "Calendar"
});

// ----- create service object
export const eventsService = {
    get: function () {
        return api.get();
    },
    getById: function (id) {
        return api.get(`${id}`);
    },
    create: function (model) {
        return api.post("", model);
    },
    add: function (id) {
        return api.post("", id);
    },
    delete: function (id) {
        return api.delete(`${id}`);
    }
}