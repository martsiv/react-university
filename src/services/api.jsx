import axios from "axios";

export default axios.create({
    baseURL: "https://university-web.azurewebsites.net/api/"
});