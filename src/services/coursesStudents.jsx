import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "CoursesStudents/"
});

// ----- create service object
export const coursesStudentsService = {
    get: function (courseId, studentId) {
        return api.get("", {courseId, studentId});
    },
    create: function (courseId, studentId) {
        return api.post("", { courseId, studentId });
    },
    delete: function (courseId, studentId) {
        return api.delete("", { courseId, studentId });
    }
}