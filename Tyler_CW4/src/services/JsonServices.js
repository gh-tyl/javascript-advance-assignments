import http from "../http-common";

class JsonServices {
    getProd() {
        return http.get("data/productList.json");
    }
    getUser() {
        return http.get("data/customers.json");
    }
    getCity() {
        return http.get("data/cities.json");
    }
}

export default new JsonServices();
