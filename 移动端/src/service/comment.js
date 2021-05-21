import {sharingRequest} from "./request";

export async function createComment(momentId, content) {
    console.log(momentId, content)
    return await sharingRequest.post("/comment", {
        momentId,
        content
    });
}

// 根据父级评论，获取子评论
export async function getAllChildByFatherId(rootCommentId) {
    return await sharingRequest.get("/comment/allChildByFatherId/" + rootCommentId);
}

