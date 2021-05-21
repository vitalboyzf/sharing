const connection = require("../app/database");
class CommentService {
    async create(momentId, content, userId) {
        const statement = `insert into comment(content,moment_id,user_id) values(?,?,?)`;
        const [result] = await connection.execute(statement, [content, momentId, userId]);
        return result;
    }
    async reply(momentId, content, userId, commentId) {
        const statement = `insert into comment(content,moment_id,user_id,comment_id) values(?,?,?,?)`;
        const [result] = await connection.execute(statement, [content, momentId, userId, commentId]);
        return result;
    }
    async updateFabulous(commentId, fabulous) {
        const statement = `update comment set fabulous = ? where id = ?`;
        const [result] = await connection.execute(statement, [fabulous, commentId]);
        return result;
    }
    async remove(commentId) {
        const statement = `delete from comment where id = ?`;
        const [result] = await connection.execute(statement, [commentId]);
        return result;
    }
    async getCommentsByMomentId(momentId) {
        const statement = `
        select
            c.id,c.content,c.comment_id commentId,c.fabulous,c.createAt createTime,c.updateAt updateTime,
            json_object('id',u.id,'name',u.name,avatarUrl,u.avatarUrl) user
        from comment c
            left join users u on c.user_id = u.id
        where moment_id = ?;
        `;
        const [result] = await connection.execute(statement, [momentId]);
        console.log(result);
        return result;
    }
    async getAllChildByFatherId(commentId) {
        const statement = `
        select c.id, c.content, c.createAt, json_object('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) user
        from comment c
                 left join users u
                           on u.id = c.user_id
        where c.comment_id = ?;`;
        const [result] = await connection.execute(statement, [commentId]);
        console.log(result);
        return result;
    }
    async getAllComment(offset,limit){
            const statement = `
        select c.id, c.content, c.createAt, json_object('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url) user
from comment c
         left join users u
                   on u.id = c.user_id
limit ?,?;`;
        const [result] = await connection.execute(statement, [offset,limit]);
        return result;
    }
}
module.exports = new CommentService();