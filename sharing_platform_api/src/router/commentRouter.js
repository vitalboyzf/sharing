const Router = require("koa-router");
const commentController = require("../controller/commentController");

const {
    verifyAuth,
    verifyPermission
} = require("../middleware/authMiddleware");

const commentRouter = new Router({
    prefix: "/comment"
});
// 添加一条评论
commentRouter.post("/", verifyAuth, commentController.create);
// 回复一条评论
commentRouter.post("/:id/reply", verifyAuth, commentController.reply);
// 修改点赞数
commentRouter.patch("/:id", verifyAuth, verifyPermission("comment"), commentController.updateFabulous);
// 删除评论
commentRouter.delete("/:id", verifyAuth, verifyPermission("comment"), commentController.remove);
// 根据动态id获取评论列表
commentRouter.get("/:id", commentController.list);
// 根据动态id获取评论列表
commentRouter.get("/get/all", commentController.getAll);
commentRouter.get("/allChildByFatherId/:id", commentController.getAllChildByFatherId);
module.exports = commentRouter;