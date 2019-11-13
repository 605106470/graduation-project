const{ exec,escape }=require('../db/mysql.js')

const login = (username,password) =>{
    username = escape(username)   //sql安全
    password = escape(password)
    let sql =`
    select username from users where username=${username} and password=${password}
    `
    return exec(sql).then(rows => {
        return rows[0]||{}
    })
}

// 判断用户表中用户名有没有重复
const checkusername=(username)=>{
    username = escape(username)
    let sql = `select username from users where username=${username}`
    return exec(sql).then(rows => {
        return rows[0]||{}
    })
}


const register = (username,password) => {
    username = escape(username)   
    password = escape(password)
    let sql =`
    insert into users (username,password)values(${username},${password})
    `
    return exec(sql).then(insertData => {
        return {
            id:insertData.insertID
        }
    })
}


const addMessage = (username,content)=>{
    let sql =`insert into message (username,content)values('${username}','${content}');`
    return exec(sql).then(insertData => {
        return {
            id:insertData.insertID
        }
    })
}

const getallMessage=()=>{
    let sql =`select * from message order by createtime desc;`
    return exec(sql)
}


const addComment = (username,content,id)=>{
    let sql =`insert into comment (id,username,content)values('${id}','${username}','${content}');`
    return exec(sql).then(insertData => {
        return {
            id:insertData.insertID
        }
    })
}

const getComment = (id)=>{
    const sql =`select * from comment where id=${id};`
    return exec(sql)
}

const getallmyMessage=(username)=>{
    let sql =`select * from message where username='${username}' order by createtime desc;`
    return exec(sql)
}

const delmyliuyan=(id)=>{
    let sql = `delete from message where id='${id}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0){
            return true
        }
        return false
    })
}


// 用户添加商品到购物车
const addcart=(title,productImage,content,sellername,price,customer,id)=>{
    let sql = `insert into cart (title,productImage,content,sellername,price,customer,goodsid)values('${title}','${productImage}','${content}','${sellername}','${price}','${customer}',${id});`
    return exec(sql).then(insertData => {
        return {
            id:insertData.insertID
        }
    })
}

//判断购物车中有没有重复的商品
const checkgoodsname=(id,customer)=>{
    let sql=`select id from cart where goodsid='${id}' and customer='${customer}'`
    return exec(sql).then(rows => {
        return rows[0]||{}
    })
}

//用户获取自己购物车列表
const getmycartlist=(customer)=>{
    let sql=`select * from cart where customer='${customer}';`
    return exec(sql)
}

//用户在支付页面中加载已选中商品的商品ID
const getcheckgoods=(customer)=>{
    let sql=`select goodsid from cart where customer='${customer}' and tocheck='1';`
    return exec(sql)
}

//用户选中购物车中商品
const checkcartgoods=(id,tocheck)=>{
    let sql =`update cart set tocheck='${tocheck}' where id=${id};`
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0){
            return true
        }
            return false
    })
}

//用户删除购物车中商品
const delcartgoods=(id)=>{
    let sql = `delete from cart where id='${id}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0){
            return true
        }
        return false
    })
}

//用户获取所买到的商品列表
const getbuygoodslist=(customer)=>{
    let sql=`select * from goodslist where customer='${customer}' and ifsell='已售出' and sellshow=0;`
    return exec(sql)
}

//用户确认收货
const confirmgoods=(id)=>{
    let sql =`update goodslist set sellshow='1' where id=${id};`
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0){
            return true
        }
            return false
    })
}

module.exports={
    login,
    register,
    addMessage,
    getallMessage,
    addComment,
    getComment,
    getallmyMessage,
    delmyliuyan,
    checkusername,
    addcart,
    checkgoodsname,
    getmycartlist,
    checkcartgoods,
    delcartgoods,
    getcheckgoods,
    getbuygoodslist,
    confirmgoods
}