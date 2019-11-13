<template>
    <div>
       <div class="background"></div>
       <div class="header">我的购物车</div>
       <div class="back" @click="back">返回</div>
       <div class="gopay" @click="gopay">去结算</div>
       <div class="total-price">总价：{{totle}}元</div>
       <div class="container">
            <ul>
                <li v-for="item in mycartlist">
                    <a class="radio" @click="check(item)" v-bind:class="{'radiotwo':item.tocheck ===1}"/>
                    <img v-bind:src="'../../../static/goodphotos/'+item.productImage">
                    <div class="goodstitle">商品标题：{{item.title}}</div>
                    <div class="goodscontent">商品详情：{{item.content}}</div>
                    <div class="price">发布价格：¥{{item.price}}</div>
                    <div class="username">发布人：{{item.sellername}}</div>
                    <div class="del" @click="delcartgoods(item)">删除</div>
                </li>
            </ul>
            <div v-show="ok" class="submit-delete">
                <div class="message">是否确认删除商品？</div>
                <div class="sure-delete" @click="submitdel">确认</div>
                <div class="cancel-delete" @click="canceldelete">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                mycartlist:[],
                ok:false,
                itemone:{}
            }
        },
        computed:{
            totle(){
                var money=0;
                this.mycartlist.forEach((item) => {
                    if(item.tocheck==1){
                        money += item.price;
                    }
                });
                return money;
            }
        },
        mounted(){
            this.getmycartlist()
        },
        methods:{
            back(){
               this.$router.push('/home'); 
            },
            getmycartlist(){
                this.$http.get('/users/getmycartlist').then((res)=>{
                     if (res.body.errno === 0) {
                        this.mycartlist=res.data.data
                    } 
                })
            },
            check(item){
                let gocheck=0;
                if(item.tocheck==0){
                    gocheck=1;
                }else{
                    gocheck=0;
                }
                this.$http.post('/users/checkcartgoods',{'id':item.id,'tocheck':gocheck}).then((res)=>{
                    if (res.body.errno === 0) {
                        this.getmycartlist();
                    } 
                })
            },
            gopay(){
                if(!this.mycartlist){
                    alert('您的购物车为空，无法支付！')
                    return
                }
                let a=false;
                this.mycartlist.forEach((item)=>{
                    if(item.tocheck==1){
                        a=true;
                    }
                })
                if(a){
                    this.$router.push('/pay'); 
                }else{
                    alert('您未选中任何商品，无法支付！')
                }
            },
            delcartgoods(item){
                this.ok=true;
                this.itemone=item;
            },
            canceldelete(){
                this.ok=false;
            },
            submitdel(){
                this.$http.post('/users/delcartgoods',{'id':this.itemone.id}).then((res)=>{
                    if(res.body.errno === 0){
                        alert(res.body.message);
                        this.ok = false;
                        this.getmycartlist();
                    }else{
                        alert(res.body.message);
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
.total-price{
    position: fixed;
    width:150px;
    border:1px solid black;
    height:50px;
    line-height: 50px;
    padding-left:20px;
    right:40px;
    bottom:170px;
    font-size:18px;
    border-radius: 10px;
}
.gopay{
    position: fixed;
    width:150px;
    border:1px solid black;
    height:50px;
    line-height: 50px;
    right:40px;
    bottom:95px;
    font-size:18px;
    text-align:center;
    cursor: pointer;
    border-radius: 10px;
}
.back:hover,
.gopay:hover{
    background-color:rgba(0,0,0,0.3);
    color:white;
}
.header{
    position:relative;
    height:135px;
    line-height:135px;
    text-align: center;
    font-size:30px;
}
.container{
    position: relative;
    width:1400px;
    left:300px;
    height:700px;
}
.container ul{
    width:1400px;
    height:695px;
    border:1px solid black;
    padding-bottom: 25px;
    overflow:auto;
}
.container ul li{
    border:1px solid black;
    width:1300px;
    margin-left:50px;
    height:50px;
    line-height: 50px;
    margin-top:20px;
    position:relative;
    height:200px;
    background-color:rgba(255,255,255,0.5);
    border-radius:10px;
}
.container ul li img{
    width:200px;
    height:200px;
    margin-left:40px;
    object-fit: contain;
}
.container ul li .goodstitle{
    position: absolute;
    width:250px;
    height:50px;
    line-height: 50px;
    top:13px;
    left:250px;
    overflow:auto;
}
.container ul li .goodscontent{
    position: absolute;
    width:300px;
    height:180px;
    line-height: 50px;
    top:20px;
    left:750px;
    word-break: break-all;
    line-height:30px;
    overflow:auto;
}
.container ul li .price{
    position: absolute;
    width:200px;
    height:50px;
    top:12px;
    left:510px;
}
.container ul li .username{
    position: absolute;
    width:250px;
    height:50px;
    line-height: 50px;
    top:90px;
    left:250px;
}
.container ul li .del{
    position: absolute;
    border:1px solid black;
    border-radius: 5px;
    bottom:20px;
    right:10px;
    height:30px;
    width:50px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
}
.radio{
    width:20px;
    height:20px;
    position:absolute;
    left:10px;
    top:90px;
    border-radius:50%;
    background-color:gray;
    display:block;
}
.radiotwo{
    background-color:red;
}
.container .submit-delete{
    position:fixed;
    background-color:rgba(255,255,255,0.9);
    top:0;
    right:0;
    left:0;
    bottom:0;
    margin:auto;
    border-radius: 10px;
    width:400px;
    height:150px;
    border:1px solid black;
}
.container .submit-delete .message{
    margin-top:20px;
    text-align: center;
    font-size:25px;
}
.container .submit-delete .sure-delete{
    position:absolute;
    width:100px;
    height:50px;
    left:60px;
    top:90px;
    border:1px solid black;
    text-align: center;
    line-height:50px;
    font-size:22px;
    border-radius: 10px;
    cursor: pointer;
}
.container .submit-delete .cancel-delete{
    position:absolute;
    width:100px;
    height:50px;
    left:240px;
    top:90px;
    border:1px solid black;
    text-align: center;
    line-height:50px;
    font-size:22px;
    border-radius: 10px;
    cursor: pointer;
}
.container .submit-delete .sure-delete:hover,
.container .submit-delete .cancel-delete:hover,
.container ul li .del:hover{
    background-color:rgba(78, 221, 247, 0.5)
}
</style>