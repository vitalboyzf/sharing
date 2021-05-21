import {sharingRequest} from "./request";


export async function getLabelsByPage(offset = 0, limit = 10) {
    return await sharingRequest.get("/label", {
        params: {
            offset,
            limit
        }
    });
}
export async function getAllLabels() {
    return await sharingRequest.get("/label/all");
}

export async function getLabelIdByName(labelName) {
    return await sharingRequest.get("/label/name", {
        params: {
            labelName
        }
    });
}

export async function createLabel(name) {
    return await sharingRequest.post("/label", {
        name,
    });
}

