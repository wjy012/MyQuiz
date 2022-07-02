const mysql = require("mysql2");
const mysqlOpt = require("../config/keys").mysqlOpt

const conn = mysql.createPool(mysqlOpt)

function dbMW(err, res, resolve, reject){
    if(err){
        console.log("ERROR IN MYSQL:" + err);
        reject(err);
        throw err;
    }else{
        resolve(res);
    }
}

module.exports = {
    select(params){
        return new Promise((resolve, reject)=>{
            conn.query(
                `SELECT ${params.select} FROM ${params.table} WHERE ${params.where}`,
                (err, res)=>dbMW(err, res, resolve, reject));
        })
    },
    insert(params){
        return new Promise((resolve, reject)=>{
            conn.query(
                `INSERT INTO ${params.table} values ${params.values}`,
                (err, res)=>dbMW(err, res, resolve, reject));
        })
    },
    update(params){
        return new Promise((resolve, reject)=>{
            conn.query(
                `UPDATE ${params.table} SET ${params.set} WHERE ${params.where}`,
                (err, res)=>dbMW(err, res, resolve, reject));
        })
    },
}