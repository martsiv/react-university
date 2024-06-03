import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "GoogleOAuth",
    withCredentials: true
});

// ----- create service object
export const oAuthService = {
    authorize: function (rememberMe = false) {
        return api.get('/RedirectOnOAuthServer', {
            params: {
                rememberMe: rememberMe
            }
        });
    }
}