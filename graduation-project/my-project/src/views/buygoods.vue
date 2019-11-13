<template>
    <div>
        <div class="background"></div>
        <div class="header">我买到的</div>
        <div class="back" @click="backhome" >返回主页</div>
        <div class="container">
            <ul>
                <li v-for="item in buygoodslist">
                    <img v-bind:src="'../../../static/goodphotos/'+item.productImage">
                    <div class="goodstitle">商品标题：{{item.title}}</div>
                    <div class="goodscontent">商品详情：{{item.content}}</div>
                    <div class="price">发布价格：¥{{item.price}}</div>
                    <div class="username">发布人：{{item.username}}</div>
                    <div class="selltime">交易时间：{{item.selltime}}</div>
                    <div class="del" @click="delcartgoods(item)">确认收货</div>
                </li>
                <div v-show="ok" class="submit-delete">
                <div class="message">是否确认收到商品？</div>
                <div class="sure-delete" @click="submitdel">确认</div>
                <div class="cancel-delete" @click="canceldelete">取消</div>
            </div>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                buygoodslist:[],
                ok:false,
                itemone:{}
            }
        },
        mounted(){
            this.getbuygoodslist()
        },
        methods:{
            backhome(){
                this.$router.push('/home'); 
            },
            getbuygoodslist(){
                this.$http.get('/users/getbuygoodslist').then((res)=>{
                     if (res.body.errno === 0) {
                        this.buygoodslist=res.data.data
                    } 
                })
            },
            delcartgoods(item){
                this.ok=true;
                this.itemone=item;
            },
            canceldelete(){
                this.ok=false;
            },
            submitdel(){
                this.$http.post('/users/confirmgoods',{'id':this.itemone.id}).then((res)=>{
                    if(res.body.errno === 0){
                        alert(res.body.message);
                        this.ok = false;
                        this.getbuygoodslist();
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
.header{
    position:relative;
    height:135px;
    line-height:135px;
    text-align: center;
    font-size:30px;
}
.back:hover,
.container ul li .del:hover{
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
.selltime{
    position: absolute;
    width:250px;
    height:50px;
    line-height: 50px;
    top:90px;
    left:510px;
}
.container ul li .del{
    position: absolute;
    border:1px solid black;
    border-radius: 5px;
    bottom:20px;
    right:10px;
    height:30px;
    width:100px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
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
.container .submit-delete .cancel-delete:hover{
    background-color:rgba(78, 221, 247, 0.5)
}
</style>