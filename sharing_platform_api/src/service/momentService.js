const connection = require("../app/database");
const {APP_PORT} = require("../app/config")
class MomentService {
    async create(id, content, title) {
        const statement = `INSERT INTO moment (user_id,content,title) VALUES (?,?,?);`;
        const result = await connection.execute(statement, [id, content, title]);
        return result[0];
    }
    async getMomentById(id) {
        const statement = `
    SELECT
        m.id id,m.content content,m.views,m.createAt createTime,m.updateAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.avatar_url,'sentence',u.short_sentence) user
    FROM moment m
        LEFT JOIN users u on m.user_id = u.id
    where m.id=?`;
        const result = await connection.execute(statement, [id]);
        return result[0][0];
    }
    async getMomentByIdDetail(id) {
        const statement = `
SELECT m.id                                    id,
        m.content                               content,
        m.views,
        m.title,
        m.createAt                              createTime,
        m.updateAt                              updateTime,
        json_object('id', u.id, 'name', u.name,'avatarUrl',u.avatar_url,'createTime',u.createAt,'sentence',u.short_sentence) author,
        if(count(c.id), json_arrayagg(
            json_object('id', c.id,
                        'content', c.content,
                        'commentId', c.comment_id,
                        'createTime', c.createAt,
                        'user', json_object('id', cu.id, 'name', cu.name,'avatarUrl',cu.avatar_url,'sentence',cu.short_sentence)
                )
        ), null)                            comments,
            (select json_arrayagg(concat('http://49.232.250.47:${APP_PORT}/moment/images/',file.filename))
            from file
            where m.id = file.moment_id) pictures
 FROM moment m
          LEFT JOIN users u on m.user_id = u.id
          LEFT JOIN comment c on c.moment_id = m.id
          LEFT JOIN users cu on cu.id = c.user_id
 where m.id = ?;`;
        const result = await connection.execute(statement, [id]);
        return result[0][0];
    }
    async getCountMoment() {
        const statement = `select count(id) count from moment`;
        const [result] = await connection.execute(statement);
        return result[0];
    }
    async getListByPage(offset, limit) {
        const statement = `SELECT
        m.id id,m.content content, m.title,m.views,m.createAt createTime,m.updateAt updateTime,
        json_object('id',u.id,'name',u.name,'avatarUrl',u.avatar_url,'sentence',u.short_sentence)  author,
        (select count(*) from comment c where c.moment_id=m.id) commentCount,
        (select COUNT(*) from moment_label ml where ml.moment_id = m.id) labelCount,
        (select json_arrayagg(concat('http://49.232.250.47:${APP_PORT}/moment/images/',file.filename))
        from file
        where m.id = file.moment_id) pictures
        FROM moment m
        LEFT JOIN users u on m.user_id = u.id
        order by m.createAt desc
        limit ?,?`;
        const result = await connection.execute(statement, [offset, limit]);
        return result[0];
    }
    async deleteById(id) {
        const statement = `DELETE FROM moment where id=?;`;
        const result = await connection.execute(statement, [id]);
        return result[0];
    }
    async updateMomentById(content, id) {
        const statement = `UPDATE moment set content = ? where id = ?;`;
        const result = await connection.execute(statement, [content, id]);
        return result[0];
    }
    async hasLabel(momentId, labelId) {
        const statement = `select * from moment_label where moment_id=? and label_id=?;`;
        const [result] = await connection.execute(statement, [momentId, labelId]);
        return result[0];
    }
    async addLabel(momentId, labelId) {
        const statement = `insert into moment_label(moment_id,label_id) values(?,?) `;
        const [result] = await connection.execute(statement, [momentId, labelId]);
        return result;
    }
    async getFileByFilename(filename) {
        const statement = `select * from file where filename = ?`;
        const [result] = await connection.execute(statement, [filename]);
        return result;
    }
    async getMomentByUserId(userId) {
        const statement = `
        SELECT m.id                                                               id,
        m.content                                                          content,
        m.views,
        m.title,
        m.createAt                                                         createTime,
        m.updateAt                                                         updateTime,
        json_object('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url,'sentence',u.short_sentence) author,
        (select count(*) from comment c where c.moment_id = m.id)          commentCount,
        (select COUNT(*) from moment_label ml where ml.moment_id = m.id)   labelCount,
        (select json_arrayagg(concat('http://49.232.250.47:${APP_PORT}/moment/images/', file.filename))
         from file
         where m.id = file.moment_id)                                      pictures
 FROM moment m
          LEFT JOIN users u on m.user_id = u.id
 where user_id = ?
 order by m.createAt desc;`;
        const [result] = await connection.execute(statement, [userId]);
        return result;
    }
    async getMomentByLabel(labelId) {
        const statement = `select m.id,
        m.content                                                          content,
        m.createAt                                                         createTime,
        views,
        m.title,
        label_id,
        json_object('id', u.id, 'name', u.name, 'avatarUrl', u.avatar_url,'sentence',u.short_sentence) author,
        (select count(*) from comment c where c.moment_id = m.id)          commentCount,
        (select COUNT(*) from moment_label ml where ml.moment_id = m.id)   labelCount,
        (select json_arrayagg(concat('http://49.232.250.47:${APP_PORT}/moment/images/', file.filename))
         from file
         where m.id = file.moment_id)                                      pictures
 from moment m
          left join moment_label ml on m.id = ml.moment_id
          left join users u on m.user_id = u.id
          left join label l on ml.label_id = l.id
 having label_id = ?
 order by m.createAt desc;`;
        const [result] = await connection.execute(statement, [labelId]);
        return result;
    }
    async increaseViews(momentId, count) {
        const statement = `update moment set views = ? where id = ?;`;
        const [result] = await connection.execute(statement, [count, momentId]);
        return result;
    }
    async getMomentByViews(offset = 0, limit = 3) {
        const statement = `SELECT
        m.id id,m.content content,m.views, m.title,m.createAt createTime,m.updateAt updateTime,
        json_object('id',u.id,'name',u.name,'avatarUrl',u.avatar_url,'sentence',u.short_sentence)  author,
        (select count(*) from comment c where c.moment_id=m.id) commentCount,
        (select COUNT(*) from moment_label ml where ml.moment_id = m.id) labelCount,
        (select json_arrayagg(concat('http://49.232.250.47:${APP_PORT}/moment/images/',file.filename))
        from file
        where m.id = file.moment_id) pictures
        FROM moment m
        LEFT JOIN users u on m.user_id = u.id
        order by m.views desc
        limit ?,?`;
        const [result] = await connection.execute(statement, [offset, limit]);
        return result;
    }
}
module.exports = new MomentService();