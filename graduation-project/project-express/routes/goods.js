var express = require('express');
var async = require('async');
var router = express.Router();
const fs= require('fs');
const { SuccessModel,ErrorModel } = require('../model/resModel')
const { getList,getAllList,searchList,searchListLength,getuserList,deletemygoods,pageview,addcustomer } = require('../controller/goods.js')


router.post('/getlist',function(req,res,next){
    const page = req.body.page
    const topcishu = req.body.topcishu
    const result = getList(page,topcishu);
    return result.then(listData =>{
        res.json(new SuccessModel(listData)) 
    })
})


router.get('/getalllist',function(req,res,next){
    const result = getAllList ();
    return result.then(listData =>{
        res.json(new SuccessModel(listData)) 
    })
})

router.post('/searchList',function(req,res,next){
    const keyword = req.body.keyword || ''
    const repage = req.body.repage
    const result = searchList(keyword,repage)
    return result.then(listData => {
        res.json(new SuccessModel(listData))
    })
})

//获取所有含有关键字的列表
router.post('/searchalllist',function(req,res,next){
    const keyword = req.body.keyword || ''
    const result = searchListLength (keyword);
    return result.then(listData =>{
        res.json(new SuccessModel(listData)) 
    })
})


//获取用户自己的发布商品列表
router.get('/getuserlist',function(req,res,next){
    if(!req.session.username){
        res.json(
            new ErrorModel('未登录')
        )
        return
    }
    const username = req.session.username
    const result = getuserList(username)
    return result.then(listData => {
        res.json(new SuccessModel(listData))
    })
})

//删除用户自己发布的商品
router.post('/delmygoods',function(req,res,next){
    const id = req.body.id
    const image= '../../graduation-project/my-project/static/goodphotos/'+req.body.image

    const result = deletemygoods(id);
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

//点击浏览数量
router.post('/cishu',function(req,res,next){
    const username=req.body.username
    if(username==req.session.username){
        return
    }
    const id = req.body.id
    const cishu = req.body.cishu
    const result = pageview(id,cishu);
    return result.then(val => {
        if(val){
          res.json(new SuccessModel())
          return
        } 
        res.json(new ErrorModel('修改失败'))
      })
})

//添加买家信息到商品列表成功支付的商品中
router.post('/addcustomermessage',function(req,res,next){
    const goodsid = req.body.goodsid
    const contactway = req.body.contactway
    const customer = req.session.username
    let selltimeone = new Date();
    let selltime=selltimeone.toLocaleString();

    async.mapSeries(goodsid, function(id,done){
        addcustomer(id, customer, contactway,selltime, function(err,result){
            done(err,result)
        })
    },function (err,result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
        
    })
})



module.exports = router;