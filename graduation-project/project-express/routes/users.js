var express = require('express');
var router = express.Router();
const { SuccessModel,ErrorModel } = require('../model/resModel')
const {login,register,addMessage,getallMessage,addComment,getComment,getallmyMessage,delmyliuyan,checkusername,addcart,checkgoodsname,getmycartlist,checkcartgoods,delcartgoods,getcheckgoods,getbuygoodslist,confirmgoods}=require('../controller/user')
const { addGoods,updateGoods,updateGoodstwo }=require('../controller/goods')
const multiparty=require('multiparty');
const path=require('path');
const fs= require('fs');


router.post('/login', function(req, res, next) {
  const {username, password} = req.body
  const result =login(username,password)
  return result.then(data => {
      if(data.username){
          //设置session
          req.session.username = data.username
          res.json(new SuccessModel(data.username)) 
          return
      }
      res.json(new ErrorModel('登录失败'))
  })
});

router.post('/checkusername',function(req,res,next){
  const username= req.body.username
  const result =checkusername(username)
  return result.then(data => {
    if(data.username){
      res.json(new SuccessModel('该用户名已被占用!'))
    }else{
      res.json(new ErrorModel())
    }
})
})


router.post('/register',function(req,res,next){
  const {username, password} = req.body
  const result =register(username,password)
  return result.then(id => {
    if(id){
      res.json(new SuccessModel()) 
      return
  }
  res.json(new ErrorModel('注册失败'))
  })
})

router.get('/zhuxiao',function(req,res,next){
  req.session.username = ''
  res.json(new SuccessModel())
  return
})

router.get('/backhome',function(req,res,next){
  res.json(new SuccessModel())
  return
})

//照片改名操作
router.post('/changename',function(req,res,next){
  let now=Date.parse(new Date());
  let form=new multiparty.Form({uploadDir:'‪../../../my-project/static/goodphotos'});
  form.parse(req,function (err,filds,files) {
      if(err){
          res.send({
              "errno":err.message,
              "data": form
          });
      }
      else{
          let inputFile=files.photos[0];
          //console.log(inputFile);   //查看文件信息
          let extname= path.extname(inputFile.originalFilename) ;
          let oldname=inputFile.path;
          fs.rename(oldname,`‪../../../my-project/static/goodphotos/`+now+`${extname}`,(err)=>{
              if(err){
                  res.send('err2');
              }
              else{
                  res.send({
                      "errno": 0,
                      "data": now+`${extname}`
                  })
              }
          })
      }
  });
});


router.post('/addgoods',function(req,res,next){
  if(!req.session.username){
    res.json(
        new ErrorModel('未登录,请先登录')
    )
    return
}
  const username = req.session.username
  const {title,content,productImage,price,fenlei} = req.body
  const result = addGoods(title,productImage,content,username,price,fenlei)
  return result.then(id => {
    if(id){
      res.json(new SuccessModel())
      return
    } 
    res.json(new ErrorModel('发布失败'))
  })
})


//用户修改自己商品(有图)
router.post('/savegoods',function(req,res,next){
  const image = '../../graduation-project/my-project/static/goodphotos/'+req.body.pastimage
  const {title,content,productImage,price,id} = req.body
  const result = updateGoods(title,productImage,content,price,id)
  return result.then(val => {
    if(val){
      fs.unlink(image,function(err){
        if(err){
          throw err;
        }
      })
      res.json(new SuccessModel())
      return
    } 
    res.json(new ErrorModel('修改失败'))
  })
})

//用户修改自己商品（没图）
router.post('/savegoodstwo',function(req,res,next){
  const {title,content,price,id} = req.body
  const result = updateGoodstwo(title,content,price,id)
  return result.then(val => {
    if(val){
      res.json(new SuccessModel())
      return
    } 
    res.json(new ErrorModel('修改失败'))
  })
})


//用户添加留言
router.post('/addmessage',function(req,res,next){
  if(!req.session.username){
    res.json(
        new ErrorModel('未登录,请先登录')
    )
    return
}
  const username = req.session.username
  const content = req.body.liuyan
  const result = addMessage(username,content)
  return result.then(id => {
    if(id){
      res.json(new SuccessModel())
      return
    } 
    res.json(new ErrorModel('发布失败'))
  })
})

//获取所有留言
router.get('/getallmessage',function(req,res,next){
  const result = getallMessage()
  return result.then(listData =>{
    res.json(new SuccessModel(listData)) 
  })
})


//用户添加评论
router.post('/addcomment',function(req,res,next){
  if(!req.session.username){
    res.json(
        new ErrorModel('未登录,请先登录')
    )
    return
}
  const username = req.session.username
  const content = req.body.pinglun
  const id = req.body.id
  const result = addComment(username,content,id)
  return result.then(id => {
    if(id){
      res.json(new SuccessModel())
      return
    } 
    res.json(new ErrorModel('评论失败'))
  })
})


//用户查看评论
router.post('/getcomment',function(req,res,next){
  const id = req.body.id
  const result = getComment(id)
  return result.then(listData => {
    res.json(new SuccessModel(listData))
  })
})


//用户查看自己的留言
router.get('/getallmymessage',function(req,res,next){
  if(!req.session.username){
    res.json(
        new ErrorModel('未登录,请先登录')
    )
    return
}
  const username=req.session.username
  const result = getallmyMessage(username)
  return result.then(listData =>{
    res.json(new SuccessModel(listData)) 
  })
})

//用户删除自己的留言
router.post('/delmyliuyan',function(req,res,next){
  const id = req.body.id
  const result = delmyliuyan(id);
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

//检查购物车有没有重复商品
router.post('/checkgoodsname',function(req,res,next){
  const id = req.body.id
  const customer = req.session.username
  const result = checkgoodsname(id,customer)
  return result.then(data => {
    if(data.id){
      res.json(new SuccessModel('该商品已存在购物车中啦!'))
    }else{
      res.json(new ErrorModel())
    }
})
})



// 用户添加商品到购物车
router.post('/addmycart',function(req,res,next){
  const {title,productImage,content,sellername,price,id} = req.body
  const customer = req.session.username
  if(sellername===customer){
    res.json(
      new ErrorModel('不能添加自己发布的商品喔！')
    )
  return
  }
  const result = addcart(title,productImage,content,sellername,price,customer,id);
  return result.then(id => {
    if(id){
      res.json(new SuccessModel())
      return
    } 
    res.json(new ErrorModel())
  })
})

//用户获取购物车列表
router.get('/getmycartlist',function(req,res,next){
  const customer=req.session.username
  const result = getmycartlist(customer);
  return result.then(listData =>{
      res.json(new SuccessModel(listData)) 
  })
})

//用户在支付页面中加载已选中商品的商品ID
router.get('/getcheckgoods',function(req,res,next){
  const customer=req.session.username
  const result = getcheckgoods(customer);
  return result.then(listData =>{
      res.json(new SuccessModel(listData)) 
  })
})

//用户选中购物车列表中商品
router.post('/checkcartgoods',function(req,res,next){
  const id=req.body.id
  let tocheck=req.body.tocheck
  const result= checkcartgoods(id,tocheck);
  return result.then(val => {
    if(val){
      res.json(new SuccessModel())
      return
    } 
    res.json(new ErrorModel('选中失败'))
  })
})

//用户删除购物车列表中商品
router.post('/delcartgoods',function(req,res,next){
  const id=req.body.id
  const result=delcartgoods(id);
  return result.then(val => {
    if(val){
        res.json(
            new SuccessModel('删除商品成功！')
        )
    }else{
        res.json(
            new ErrorModel('删除商品失败！')
        )
    }
    })
})

//用户获取所买到的商品列表
router.get('/getbuygoodslist',function(req,res,next){
  const customer=req.session.username
  const result = getbuygoodslist(customer);
  return result.then(listData =>{
      res.json(new SuccessModel(listData)) 
  })
})

//用户确认收货
router.post('/confirmgoods',function(req,res,next){
  const id=req.body.id
  const result= confirmgoods(id);
  return result.then(val => {
    if(val){
      res.json(new SuccessModel('收货成功！！！'))
      return
    } 
    res.json(new ErrorModel('操作失败'))
  })
})

module.exports = router;


