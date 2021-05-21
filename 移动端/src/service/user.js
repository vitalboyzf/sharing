import {sharingRequest} from "./request";

export async function register(name, password) {
    return await sharingRequest.post("/user", {
        name,
        password
    });
}

export async function login(name, password) {
    return await sharingRequest.post("/login", {
        name,
        password
    });
}

export async function whoami() {
    return await sharingRequest.get("/user/whoami");
}

export async function updateUserInfo(userId, name, shortSentence) {
    return await sharingRequest.patch("/user/" + userId, {
        name,
        shortSentence
    });
}