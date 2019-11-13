<template>
    <div>
        <div class="background"></div>
        <div class="header">支付页面</div>
        <div class="back" @click="back">返回</div>
        <div class="container" v-show="containershow"> 
            <div class="top">请填写相关信息</div>
            <div class="div div1"><img src="../../static/img/lianxi.png" > <label >联系方式：</label><input type="text" placeholder="请填写您的联系方式" maxLength="11" oninput="value=value.replace(/[^\d]/g,'')" v-model="contactway"></div>
            <div class="div"><img src="../../static/img/alipay.png" > <label >支付宝账号：</label><input type="text" placeholder="请填写您的支付宝账号" v-model="payusername"></div>
            <div class="div div3"><label >支付密码：</label><input type="password" placeholder="请填写您的支付密码" maxLength="6" oninput="value=value.replace(/[^\d]/g,'')" v-model="paypassword"></div>
            <input type="submit" class="submit" value="确认支付" @click="submitpay">
        </div>
        <div class="containertwo" v-show="containertwoshow">
            <div class="laymask-top">正在支付</div>
            <div><img src="../../static/img/loading.gif"  class="laymask-img"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                checkgoodslist:[],
                idarray:[],
                containershow:true,
                containertwoshow:false,
                contactway:'',
                payusername:'',
                paypassword:''
            }
        },
        mounted(){
            this.getcheckgoods();
        },
        methods:{
            back(){
               this.$router.push('/mycart'); 
            },
            getcheckgoods(){
                this.$http.get('/users/getcheckgoods').then((res)=>{
                    if (res.body.errno === 0) {
                        this.checkgoodslist=res.data.data
                        this.idarray=this.checkgoodslist.map(item => item.goodsid)
                    } 
                })
            },
            submitpay(){
                if(!this.contactway){
                    alert('请填写联系方式！');
                    return
                }
                if(!this.payusername){
                    alert('请填写支付宝账号！');
                    return
                }
                if(!this.paypassword){
                    alert('请填写支付密码！');
                    return
                }
                this.containershow=false;
                this.containertwoshow=true;
                setTimeout(() => {
                    this.containershow=true;
                    this.containertwoshow=false;
                    alert('支付成功！');
                     this.$router.push('/buygoods');
                }, 4000);
                //做买家成功购买商品后在商品列表中添加买家信息
                this.$http.post('/goods/addcustomermessage',{'goodsid':this.idarray,'contactway':this.contactway}).then((res)=>{
                    if (res.body.errno === 0) {
                        alert('插入卖家信息成功')
                    } 
                })
            }
        }
    }
</script>

<style  scoped>
.background{
    background-image: url('../../static/img/cartbackground.jpg');
    background-size:100% 100%;
    height:100%;
    width:1920px;
    position:fixed;
}
.header{
    position:relative;
    height:135px;
    line-height:135px;
    text-align: center;
    font-size:30px;
}
.back:hover{
    background-color:rgba(0,0,0,0.3);
    color:white;
}
.back{
    position: fixed;
    border:1px solid black;
    width:100px;
    height:50px;
    line-height: 50px;
    text-align: center;
    right:40px;
    bottom:20px;
    border-radius: 10px;
    font-size:16px;
    cursor: pointer;
}
.container{
    position: fixed;
    width:600px;
    top:0;
    right:0;
    left:0;
    bottom:0;
    margin:auto;
    height:450px;
    background-color:white;
    border:1px solid black;
    border-radius: 10px;
}
.top{
    height:40px;
    line-height: 40px;
    text-align: center;
    font-size:24px;
    margin-top:20px;
}
.div{
    height:70px;
    line-height: 70px;
    text-align: center;
    font-size:20px;
    margin-top:30px;
}
.div input{
    height:30px;
    line-height: 30px;
    padding-left:10px;
    width:300px;
    font-size:18px;
}
.div img{
    position: relative;
    top:10px;
}
.div1{
    padding-left:20px;
}
.div3{
    padding-left:65px;
}
.submit{
    position: relative;
    width:150px;
    height:40px;
    left:230px;
    bottom:-30px;
}
.containertwo{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 99999;
}
.laymask-top{
    position: absolute;
    top:50%;
    left:50%;
    margin-top:-60px;
    margin-left:-150px;
    width:300px;
    height:50px;
    line-height: 50px;
    text-align: center;
    font-size:30px;
    font-style: oblique;
}
.laymask-img{
    position: absolute;
    top:50%;
    left:50%;
    margin-left:-25px;
}
</style>