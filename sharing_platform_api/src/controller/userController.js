const fs = require("fs");
const {
    UN_AUTHORIZATION
} = require("../constant/errorTypes");
const fileService = require("../service/fileService");
const userService = require("../service/userService");
const resultObj = require("../utils/resultCreator");
const throwError = require("../utils/throwError");

class UserController {
    async create(ctx) {
        await userService.create(ctx.request.body);
        ctx.body = resultObj(200, "添加用户成功");
    }
    async avatarInfo(ctx) {
        const userId = ctx.params.id;
        const avatarInfo = await fileService.getAvatarByUserId(userId);
        ctx.response.set("content-type", avatarInfo.mime_type);
        ctx.body = fs.createReadStream(`./uploads/avatar/${avatarInfo.filename}`);
    }
    async whoami(ctx) {
        const userName = ctx.state.user.name;
        const userInfo = await fileService.getUserInfoByName(userName);
        ctx.body = resultObj(200, "查询成功", userInfo);
    }
    async updateUserInfo(ctx) {
        const userId = ctx.state.user.id;
        const patchUserId = ctx.params.userId;
        if (userId !== +patchUserId) {
            return throwError(ctx, UN_AUTHORIZATION);
        }
        const {
            name,
            shortSentence
        } = ctx.request.body;
        const res = await fileService.updateUserInfo(userId, {
            name,
            shortSentence
        });
        ctx.body = resultObj(200, "修改成功", res);
    }
}
module.exports = new UserController();