const { exec, escape } = require('../db/mysql.js')
const xss = require('xss')

const getList = (author,keyword) => {
    author = escape(author)
    keyword = escape('%' + keyword + '%')
    let sql = `select * from blogs where 1=1 `       //1=1是为了确保在author，id没有值的情况下不会报错
    if(author!="''"){ 
        sql += `and author=${author} `    
    }
    if(keyword) {
        sql += `and title like ${keyword} `
    }
    
    sql += `order by createtime desc;`
    //返回promise
    return exec(sql)
}

const getDetail = (id) => {
    //先返回假数据
    id = escape(id)
    const sql = `select* from blogs where id=${id}`
    return exec(sql).then(rows =>{
        return rows[0]
    })
}

const newBlog = (blogData = {}) =>{
    //blogData是一个博客对象,包含title content author属性
    let title = xss(blogData.title)
    let content = xss(blogData.content)
    let author = blogData.author
    let createTime =Date.now()

    title = escape(title)
    content = escape(content)
    author = escape(author)

    const sql =`
        insert into blogs (title,content,createtime,author)
        values(${title},${content},'${createTime}',${author})
    `
    return exec(sql).then(insertData => {
        // console.log('insertData is',insertData)
        return{
            id:insertData.insertId
        }
    })
  
}

const updateBlog = (id,blogData={}) => {            //设置blogData默认值为空对象
    //blogData是一个博客对象,包含title content属性
    //id就是要更新博客的id
    let title = xss(blogData.title)
    let content=xss(blogData.content)

    title = escape(title)
    content = escape(content)

    const sql =`
        update blogs set title=${title},content=${content} where id=${id}
    `
    return exec(sql).then(updateData => {
        // console.log('updateData is ',updateData)
        if (updateData.affectedRows > 0){
            return true
        }
        return false
    })
    

    
}

const delBlog =(id,author) => {
    //id就是要删除博客的id

    const sql =`delete from blogs where id='${id}' and author='${author}'`
    return exec(sql).then(delData => {
        // console.log('delData is ',delData)
        if (delData.affectedRows > 0){
            return true
        }
        return false
    })
    
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}