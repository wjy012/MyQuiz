const sql = require("../utils/query")
const bcrypt = require("bcrypt")

module.exports = {
    getUserByID(UID){
        const queryOpt = {
            select: "*",
            table: "users",
            where: "UID=" + UID
        }
        return sql.select(queryOpt)
    },
    addAUser(UID, password, name){
        return bcrypt.hash(password, 10).then(hash=>{
            const insertOpt = {
                table: "users(UID, name, password)",
                values: `('${UID}','${name}','${hash}')`
            }
            return sql.insert(insertOpt)
        })
    }
}