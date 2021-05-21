import {
    sharingRequest
} from "./request";

export async function createComment(momentId, content) {
    console.log(momentId, content);
    return await sharingRequest.post("/comment", {
        momentId,
        content
    });
}
// 回复一条评论
export async function replyComment(momentId, content, commentId) {
    console.log(momentId, content);
    return await sharingRequest.post(`/comment/${momentId}/reply`, {
        commentId,
        content
    });
}
// 根据父级评论，获取子评论
export async function getAllChildByFatherId(rootCommentId) {
    return await sharingRequest.get("/comment/allChildByFatherId/" + rootCommentId);
}
export async function getAllComment(offset = 0, limit = 3) {
    return await sharingRequest.get("/comment/get/all", {
        params: {
            offset,
            limit
        }
    });
}