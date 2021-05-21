import {
    sharingRequest
} from "./request";

// 添加一条动态，首先需要进行登录认证
export async function createMoment(content, title) {

    return await sharingRequest.post("/moment", {
        content,
        title
    });
}

// 根据id获取一条动态
export async function getMomentById(momentId) {
    return await sharingRequest.get("/moment/detail/" + momentId);
}

export async function increaseViews(momentId, count) {
    return await sharingRequest.get("/moment/views/" + momentId, {
        params: {
            count
        }
    });
}

// 获取动态列表 分页query offset=0&limit=10
export async function getMomentByPage(offset = 0, limit = 10) {
    return await sharingRequest.get("/moment", {
        params: {
            offset,
            limit
        }
    });
}
export async function getMomentByViews(offset = 0, limit = 10) {
    return await sharingRequest.get("/moment/getByViews/three", {
        params: {
            offset,
            limit
        }
    });
}
// 获取用户的全部动态
export async function getMomentByUserId(userId) {
    return await sharingRequest.get("/moment/userId/" + userId);
}

// 获取用户的全部动态
export async function getMomentByLabelId(labelId) {
    return await sharingRequest.get("/moment/labelId/" + labelId);
}

// 修改一条动态 进行登录认证（查看是否登录） 并进行操作权限认证（操作的目标数据是否属于登录用户）
export async function updateMomentByMomentId(momentId, content) {
    return await sharingRequest.patch("/moment/" + momentId, {
        content
    });
}

// 删除一条动态 进行登录认证（查看是否登录） 并进行操作权限认证（操作的目标数据是否属于登录用户）
export async function deleteMomentByMomentId(momentId) {
    return await sharingRequest.delete("/moment/" + momentId);
}

// 为动态添加标签 进行登录认证（查看是否登录） 并进行操作权限认证（操作的目标数据是否属于登录用户） 并查看当前标签是否已经存在
export async function addLabels(momentId, labels) {
    return await sharingRequest.post(`/moment/${momentId}/labels`, {
        labels
    });
}

// 根据文件名查看动态的配图
export async function getPictureByName(filename, type) {
    return await sharingRequest.get("/moment/images/" + filename, {
        data: {
            type
        }
    });
}