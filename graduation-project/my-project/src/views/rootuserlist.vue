<template>
    <div>
        <div class="background"></div>
        <div class="header">用户列表</div>
        <div class="back" @click="back">返回</div>
        <div class="goodslist">
            <ul>
                <li v-for="item in userlist">
                    <div class="userID">用户ID：{{item.id}}</div>
                    <div class="userName">用户名：{{item.username}}</div>
                    <div class="userPaw">用户密码：{{item.password}}</div>
                    <div class="usergoodslist" @click="searchusergoods(item)">查看用户发布商品</div>
                    <div class="del" @click="displaydelete(item)">删除</div>
                </li>
            </ul>
            <!-- 删除用户界面 -->
            <div v-show="ok" class="displaydel">
                <div class="message">是否确认删除用户？</div>
                <div class="sure-delete" @click="suredelete">确认</div>
                <div class="cancel-delete" @click="canceldelete">取消</div>
            </div>
            <!-- 查看用户发布商品 -->
            <div v-show="oktwo" class="displaysearch">
                <div class="closesearch" @click="close"></div>
                <ul>
                    <li v-for="item in usergoodlist">
                        <img v-bind:src= "'../../../static/goodphotos/'+ item.productImage">
                        <div class="goodsid">商品ID：{{item.id}}</div>
                        <div class="goodstitle">商品标题：{{item.title}}</div>
                        <div class="goodscontent">商品详情：{{item.content}}</div>
                        <div class="time">发布时间：{{item.createtime|getTime}}</div>
                        <div class="price">发布价格：¥{{item.price}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                userlist:[],
                ok:false,
                itema:{},
                oktwo:false,
                item:{},
                usergoodlist:[],
                time:''
            }
        },
         mounted(){
                this.getuserslist()
        },
        filters: {
            getTime: function(value) {
                let time = new Date(value)
                let hour = time.getHours()
                let minute = time.getMinutes()
                let second = time.getSeconds()
                let year = time.getFullYear()
                let month = time.getMonth()+1
                let day = time.getDate()
                // return value.slice(0,10)+" "+value.slice(11,16);
                return  year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second
            }
        },
        methods:{
            back(){
                this.$router.push('/root');
            },
            getuserslist(){
                this.$http.get('/root/getuserlist').then((res)=>{
                     if (res.body.errno === 0) {
                        this.userlist=res.data.data
                    } 
                });
            },
            displaydelete(item){
                this.ok=true;
                this.itema=item;
            },
            canceldelete(){
                this.ok = false;
            },
            suredelete(){
                this.$http.post('/root/deluser',{'id':this.itema.id}).then((res)=>{
                    if(res.body.errno === 0){
                        alert('删除用户成功');
                        this.ok = false;
                        this.getuserslist();
                    }else{
                        alert('删除用户失败')
                    }
                })
            },
            close(){
                this.oktwo=false;
            },
            searchusergoods(item){
                this.item=item;
                this.$http.post('/root/searchusergoods',{'username':this.item.username}).then((res)=>{
                        if(res.body.errno === 0){
                        this.usergoodlist=res.data.data;
                        this.oktwo=true;
                    }else{
                        alert('查询用户发布商品失败');
                    }
                })
            }
        }
    }
</script>

<style scoped>
.background{
    background-image: url('../../static/img/root-background2.jpg');
    background-size:100% 100%;
    height:100%;
    width:1920px;
    position:fixed;
}
.header{
    position:relative;
    height:150px;
    line-height:150px;
    text-align: center;
    font-size:30px;
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
.back:hover,
.goodslist .del:hover,
.goodslist .usergoodslist:hover{
    background-color:rgba(0,0,0,0.3);
    color:white;
}
.goodslist{
    position: relative;
    width:1400px;
    left:250px;
}
.goodslist ul{
    width:1400px;
    border:1px solid black;
}
.goodslist ul li{
    border:1px solid black;
    width:1300px;
    margin-left:50px;
    height:50px;
    line-height: 50px;
    margin-top:20px;
}
.goodslist .userID{
    display:inline-block;
    margin-left:40px;
    width:150px;
    
}
.goodslist .userName{
    display:inline-block;
    width:300px;
    margin-left:40px;
}
.goodslist .userPaw{
    display:inline-block;
    width:300px;
}
.goodslist .usergoodslist{
    display:inline-block;
    border:1px solid black;
    margin-left:150px;
    cursor: pointer;
    border-radius: 5px;
    height:38px;
    width:150px;
    line-height: 38px;
    text-align: center;
}
.goodslist .del{
    display:inline-block;
    border:1px solid black;
    width:40px;
    text-align: center;
    margin-left:50px;
    cursor: pointer;
    height:38px;
    border-radius: 5px;
    line-height: 38px;
}
.goodslist .displaydel{
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
.goodslist .displaydel .message{
    margin-top:20px;
    text-align: center;
    font-size:25px;
}
.goodslist .displaydel .sure-delete{
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
.goodslist .displaydel .cancel-delete{
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
.goodslist .displaydel .sure-delete:hover,
.goodslist .displaydel .cancel-delete:hover{
    background-color:rgba(78, 221, 247, 0.5)
}
.displaysearch{
    position:fixed;
    background-color:rgba(255,255,255,0.9);
    top:170px;
    left:350px;
    border-radius: 10px;
    width:1200px;
    border:1px solid black;
    height:550px;
    overflow: auto;
}
.displaysearch ul{
    width:1100px;
    margin-left:50px;
    border:none;
}
.displaysearch ul li{
    width:1100px;
    margin-left:0px;
    margin-top:40px;
    height:200px;
    position:relative;
}
.displaysearch ul li img{
    width:200px;
    height:200px;
    margin-left:40px;
    object-fit: contain;
}
.displaysearch ul li .goodsid{
    position: absolute;
    width:150px;
    height:50px;
    top:13px;
    left:525px;
}
.displaysearch ul li .goodstitle{
    position: absolute;
    width:250px;
    height:50px;
    line-height: 50px;
    top:13px;
    left:250px;
    overflow:auto;
}
.displaysearch ul li .goodscontent{
    position: absolute;
    width:300px;
    height:180px;
    line-height: 50px;
    top:10px;
    left:750px;
    word-break: break-all;
    line-height:30px;
    overflow:auto;
}
.displaysearch ul li .time{
    position: absolute;
    width:250px;
    height:50px;
    line-height: 50px;
    top:80px;
    left:250px;
    overflow: auto;
}
.displaysearch ul li .price{
    position: absolute;
    width:200px;
    height:50px;
    top:80px;
    left:525px;
}
.displaysearch .closesearch{
    background:url('../../static/img/close.png') left no-repeat;
    background-color:white;
    position:fixed;
    width:48px;
    height:46px;
    right:390px;
    top:172px;
    cursor: pointer;
    border-radius:10px;
    z-index:100;
}
</style>