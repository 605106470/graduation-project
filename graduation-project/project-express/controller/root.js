const{ exec,escape }=require('../db/mysql.js')

const login = (username,password) =>{
    username = escape(username)   //sql安全
    password = escape(password)
    const sql =`
    select username from root where username=${username} and password=${password}
    `
    return exec(sql).then(rows => {
        return rows[0]||{}
    })
}

const  getuserlist = () => {
    let sql = `select * from users`
    return exec(sql)
}


const deluser = (id)=>{
    let sql =`delete from users where id ='${id}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0){
            return true
        }
        return false
    })
}

const search = (username)=>{
    let sql =`select * from goodslist where username='${username}' order by createtime desc;`
    return exec(sql)
}

const getgoodslist=()=>{
    let sql=`select * from goodslist order by createtime desc;`
    return exec(sql)
}

const deleteusergoods = (id)=>{
    let sql = `delete from goodslist where id='${id}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0){
            return true
        }
        return false
    })
}

const getallMessage=()=>{
    let sql =`select * from message order by createtime desc;`
    return exec(sql)
}

const getComment = (id)=>{
    const sql =`select * from comment where id=${id};`
    return exec(sql)
}

const delmessage=(id)=>{
    let sql = `delete from message where id='${id}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0){
            return true
        }
        return false
    })
}



module.exports={
    login,
    getuserlist,
    deluser,
    search,
    getgoodslist,
    deleteusergoods,
    getallMessage,
    getComment,
    delmessage
}