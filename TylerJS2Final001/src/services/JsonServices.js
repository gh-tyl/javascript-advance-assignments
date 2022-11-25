import http from "../http-common";

class JsonServices {
    getMarksData() {
        return http.get("data/marks_data.json");
    }
    getStudentsData() {
        return http.get("data/student_data.json");
    }
    getTeachersData() {
        return http.get("data/teacher_data.json");
    }
}

export default new JsonServices();
