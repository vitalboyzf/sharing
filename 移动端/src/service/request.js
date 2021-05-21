import axios from "axios";
import {devHost} from "./config";

export const sharingRequest = axios.create({
    baseURL: devHost
});
export const musicRequest = axios.create({
    baseURL: "http://49.232.250.47:6888"
});
sharingRequest.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["authorization"] = token;
    }
    return config;
});
sharingRequest.interceptors.response.use((res) => {
    if (res.config.url === "/login" && res.status === 200) {
        localStorage.setItem("token", res.data.data);
        return {
            data: "登录成功"
        };
    }
    return res.data;
}, err => {
    console.log(err);
});