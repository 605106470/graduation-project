const mysql = require('mysql')

//创建连接对象
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'011310',
    port:'3306',
    database:'myproject'
})

//开始连接
con.connect()

//统一执行sql的函数
function exec(sql){
    const promise =new Promise((resolve,reject) =>{
        con.query(sql,(err,result) =>{
            if(err){
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}


module.exports = {
    exec,
    escape: mysql.escape
}