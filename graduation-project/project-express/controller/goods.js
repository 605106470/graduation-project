const { exec, escape } = require('../db/mysql.js')
// const xss = require('xss')


const getList = (page,topcishu) => {
    const pages=page-1
    let sql = `select * from goodslist where ifsell='在售中'`
    if(topcishu===3){
            sql +=`order by cishu desc limit ${pages*8},8;`
    }else{
            sql +=`order by createtime desc limit ${pages*8},8; `
    }
    return exec(sql)

}

const getAllList = () => {
    let sql = `select * from goodslist where ifsell='在售中'; `

    return exec(sql)

}

const addGoods = (title,productImage,content,username,price,fenlei)=>{
    const sql =`
    insert into goodslist (title,productImage,content,username,price,fenlei)values('${title}','${productImage}','${content}','${username}','${price}','${fenlei}');
    `
    return exec(sql).then(insertData => {
        return{
            id:insertData.insertID
        }
    })

}
// 获取输入关键词后数据库中有多少包含关键词标题的数据总数
const searchListLength = (keyword)=>{
    // keyword = escape('%' + keyword + '%')
    let sql =`select * from goodslist where ifsell='在售中' and `
    if(keyword=="electron"){
        sql+=`fenlei='electron';`
    }else if(keyword=="daily"){
        sql+=`fenlei='daily';`
    }else if(keyword=="book"){
        sql+=`fenlei='book';`
    }else if(keyword=="others"){
        sql+=`fenlei='others';`
    }else{
        sql+= `title like '%${keyword}%';`
    }
    return exec(sql)
}

const searchList= (keyword,repage) => {
    const pages=repage-1
    keyword = escape('%' + keyword + '%')
    let sql =`select * from goodslist where ifsell='在售中' and`
    if(keyword!="'%%'"){
        if(keyword=="'%electron%'"){
            sql+=` fenlei='electron' order by createtime desc limit ${pages*8},8;`
        }else if(keyword=="'%daily%'"){
            sql+=` fenlei='daily' order by createtime desc limit ${pages*8},8;`
        }else if(keyword=="'%book%'"){
            sql+=` fenlei='book' order by createtime desc limit ${pages*8},8;`
        }else if(keyword=="'%others%'"){
            sql+=` fenlei='others' order by createtime desc limit ${pages*8},8;`
        }else{
            sql += ` title like ${keyword} order by createtime desc limit ${pages*8},8;`
        }
    }
    else{
        sql+=`limit ${pages*8},8; `
    }
    console.log(sql);
    return exec(sql)
}

//获取用户自己发布商品的列表
const getuserList = (username)=> {
    let sql = `select * from goodslist where username='${username}';`
    return exec(sql)
}

//用户删除自己的商品
const deletemygoods = (id)=>{
    let sql = `delete from goodslist where id='${id}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0){
            return true
        }
        return false
    })
}

//用户修改商品(有图片)
const updateGoods = (title,productImage,content,price,id) => {
    const sql =`update goodslist set title='${title}',productImage='${productImage}',content='${content}',price='${price}'where id=${id};`
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0){
            return true
        }
            return false
    })
}

//用户修改商品(无图片)
const updateGoodstwo = (title,content,price,id) => {
    const sql =`update goodslist set title='${title}',content='${content}',price='${price}'where id=${id};`
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0){
            return true
        }
            return false
    })
}

//点击会有浏览量
const pageview =(id,cishu)=>{
    const cishus=cishu+1
    const sql=`update goodslist set cishu='${cishus}' where id=${id};`
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0){
            return true
        }
            return false
    })
}

//商品列表商品添加卖家信息
const addcustomer=(id,customer,contactway,selltime,callback)=>{
    const sql=`update goodslist set customer='${customer}',contactway='${contactway}',selltime='${selltime}',ifsell='已售出' where id=${id};`
    
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0){
            const sql2 = `delete from cart where goodsid='${id}' and customer='${customer}';`
            exec(sql2).then((delData)=>{
                if (delData.affectedRows > 0) {               
                    callback(null,delData.affectedRows)
                }
            }).catch(err=>{
                callback(err)
            })
        }
    }).catch(err=>{
        callback(err)
    })
}


module.exports = {
    getList,
    getAllList,
    addGoods,
    searchList,
    searchListLength,
    getuserList,
    deletemygoods,
    updateGoods,
    updateGoodstwo,
    pageview,
    addcustomer
}