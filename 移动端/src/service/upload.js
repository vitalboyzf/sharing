import {sharingRequest} from "./request";

// 添加一条动态，首先需要进行登录认证
export async function uploadAvatar(avatar) {
    return await sharingRequest.post("/upload/avatar",
        avatar
        , {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
            }
        });
}

