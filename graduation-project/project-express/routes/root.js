var express = require('express');
var router = express.Router();
const fs= require('fs');
const { SuccessModel,ErrorModel } = require('../model/resModel')
const {login,getuserlist,deluser,search,getgoodslist,deleteusergoods,getallMessage,getComment,delmessage}=require('../controller/root')


//管理员登录
router.post('/login',function(req,res,next){
    const{username,password} = req.body
    const result = login(username,password)
    return result.then(data => {
        if(data.username){
            res.json(new SuccessModel()) 
            return
        }
        res.json(new ErrorModel('登录失败'))
    })
});


router.get('/getuserlist',function(req,res,next){
    const result = getuserlist();
    return result.then(listData =>{
        res.json(new SuccessModel(listData)) 
    })
})


router.post('/deluser',function(req,res,next){
    const id = req.body.id
    const result = deluser(id);
    return result.then(val => {
        if(val){
            res.json(
                new SuccessModel()
            )
        }else{
            res.json(
                new ErrorModel('删除用户失败')
            )
        }
    })
})

router.post('/searchusergoods',function(req,res,next){
    const username = req.body.username
    const result = search(username);
    return result.then(listData =>{
        res.json(new SuccessModel(listData)) 
    })
})

router.get('/getgoodslist',function(req,res,next){
    const result = getgoodslist();
    return result.then(listData =>{
        res.json(new SuccessModel(listData)) 
    })
})


router.post('/delusergoods',function(req,res,next){
    const id = req.body.id
    const image= '../../graduation-project/my-project/static/goodphotos/'+req.body.image

    const result = deleteusergoods(id);
    return result.then(val =>{
        if(val){
            fs.unlink(image,function(err){
                if(err){
                    throw err;
                }else{
                    res.json(
                        new SuccessModel()
                    )
                }
            })
        }else{
            res.json(
                new ErrorModel('删除商品失败')
            )
        }
    })
})

router.get('/getallmessage',function(req,res,next){
    const result = getallMessage()
    return result.then(listData =>{
      res.json(new SuccessModel(listData)) 
    })
  })

router.post('/getcomment',function(req,res,next){
    const id = req.body.id
    const result = getComment(id)
    return result.then(listData => {
      res.json(new SuccessModel(listData))
    })
   })


router.post('/delmessage',function(req,res,next){
  const id = req.body.id
  const result = delmessage(id);
  return result.then(val => {
    if(val){
        res.json(
            new SuccessModel()
        )
    }else{
        res.json(
            new ErrorModel('删除留言失败')
        )
    }
    })
})


module.exports = router;
