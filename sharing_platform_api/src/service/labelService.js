const connection = require("../app/database");

class LabelService {
    async create(name) {
        const statement = `
        insert into label(name) values(?)
        `;
        const [result] = await connection.execute(statement, [name]);
        return result;
    }
    async checkLabelExists(name) {
        const statement = `
         select * from label where name = ?;
         `;
        const [result] = await connection.execute(statement, [name]);
        return result;
    }
    async getLabels(offset, limit) { 
        console.log(offset,limit)
        const statement = `
        select label.id, label.name, count(label_id) count
from label
         left join moment_label ml on label.id = ml.label_id
group by label_id
limit ?,?;`;
        const [result] = await connection.execute(statement, [offset, limit]);
        return result;
    }
    async getLabelByName(LabelName) {
        const statement = `
        select * from label where name = ? `;
        const [result] = await connection.execute(statement, [LabelName]);
        return [result];
    }
     async getAllLabels() {
        const statement = `
        select * from label`;
        const [result] = await connection.execute(statement);
        return result;
    }
}
module.exports = new LabelService();