const connection = require("../app/database");
class FileService {
    async createAvatar(filename, mimetype, size, id) {
        const statement = `insert into avatar(filename,mime_type,size,user_id) values(?,?,?,?)`;
        const [result] = await connection.execute(statement, [filename, mimetype, size, id]);
        return result;
    }
    async getAvatarByUserId(userId) {
        const statement = `select * from avatar where user_id = ? order by createAt desc`;
        const [result] = await connection.execute(statement, [userId]);
        return result[0];
    }
    async getUserInfoByName(userName) {
        const statement = `select id userId,
         createAt createTime,
         name userName,
         avatar_url avatarUrl,
         short_sentence shortSentence
          from users where name = ?`;
        const [result] = await connection.execute(statement, [userName]);
        return result[0];
    }
    async updateUserInfo(userId, {
        name,
        shortSentence
    }) {
        if (name && !shortSentence) {
            const statement = `update users
            set name           = ?
            where id = ?;`;
            const [result] = await connection.execute(statement, [name, userId]);
            return result[0];
        } else if (shortSentence && !name) {
            const statement = `update users
            set short_sentence           = ?
            where id = ?;`;
            const [result] = await connection.execute(statement, [shortSentence, userId]);
            return result[0];
        }
        const statement = `update users
        set name           = ?,
            short_sentence = ?
        where id = ?;`;
        const [result] = await connection.execute(statement, [name, shortSentence, userId]);
        return result[0];
    }
}
module.exports = new FileService();