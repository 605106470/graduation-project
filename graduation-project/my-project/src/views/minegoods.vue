<template>
    <div>
         <div class="background"></div>
         <!-- 页头 -->
        <headernav></headernav>
        <div class="container">
            <div class="header">
                我的发布
            </div>
            <div class="mygoods">
                <ul class="ul">
                    <li v-for="item in mygoodlist" >
                        <!-- 图片框 -->
                        <img v-bind:src= "'../../../static/goodphotos/'+ item.productImage" @click="getdetail(item)">
                        <!-- 标题栏 -->
                        <p>{{item.title}}</p>
                        <!-- 价格 -->
                        <p>￥{{item.price}}</p>
                        <div class="edit" @click="displaychange(item)">编辑</div>
                        <div class="delete" @click="displaydelete(item)">删除</div>
                    </li>
                    <div class="clear"></div>  
                </ul>
                <!-- 显示商品详情 -->
                <div v-show="ok" class="goodsdetail">
                    <img v-bind:src= "'../../../static/goodphotos/'+ item.productImage" class="detailimg">
                    <div class="title">{{item.title}}</div>
                    <div class="content">商品详情: {{item.content}}</div>
                    <div class="price">￥{{item.price}}</div>
                    <div class="cishu">被浏览次数：{{item.cishu}}</div>
                    <div class="ifsell">状态：{{item.ifsell}}</div>
                    <div class="customer">买家：{{item.customer}}</div>
                    <div class="contactway">买家联系方式：{{item.contactway}}</div>
                    <div class="selltime">交易时间：{{item.selltime}}</div>
                    <div class="username">发布人：{{item.username}}</div>
                    <div class="createtime">发布时间：{{time}}</div>
                    <!-- 关闭按钮 -->
                    <div class="close" @click="close"></div>
                </div>
                <!-- 提示是否删除 -->
                <div v-show="oktwo" class="submit-delete">
                    <div class="message">是否确认删除商品？</div>
                    <div class="sure-delete" @click="suredelete">确认</div>
                    <div class="cancel-delete" @click="canceldelete">取消</div>
                </div>
                <!-- 编辑商品框 -->
                <div v-show="okthird" class="changegoods">
                    <div class="changeheader">请编辑您的商品信息</div>
                    <div class="changetitle">
                        <label>标题：</label><input type="text" class="changetitle-item" v-model="changetitle" >
                    </div>
                    <div class="changecontent">
                        <label>内容详情：</label><textarea class="changecontent-item" v-model="changecontent" ></textarea>
                    </div>
                    <div class="changephoto">
                        <label>添加图片：</label><input type="file" class="changephoto-item" ref="photo">
                    </div>
                    <div class="changeprice">
                        <label>价格 : &nbsp;￥ </label>&nbsp;&nbsp;<input  type="text" v-model="changeprice" >
                    </div>
                    <div class="save" @click="save">保存</div>
                    <div class="cancle-change" @click="cancelchange">取消</div>
                </div>
                 <!-- 页尾 -->
                <div class="footer">
                    <div class="footer-top">感谢使用本网站，如有更多的意见和建议请联系本站管理员QQ：605106470</div>
                    <div class="foot-bottom">Copyright &copy; 2019湖南工业大学版权所有</div>
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
import headernav from '../components/header-nav.vue'
    export default {
        data(){
            return{
                mygoodlist:[],
                item:{},
                time:'',
                ok:false,
                oktwo:false,
                itema:{},
                okthird:false,
                itemb:{},
                changetitle:'',
                changecontent:'',
                changeprice:'',
                productImage:''
            }
        },
        mounted(){
                this.getmygoodlist()
        },
        components: {
            headernav
        },
        methods:{
            getmygoodlist(){
                this.$http.get('/goods/getuserlist')
                .then((res)=>{
                    return new Promise((resolve, reject)=> {
                        if (res.body.errno === 0) {
                            this.mygoodlist=res.data.data
                        }else{
                            alert("您还未登录,请先登录！");
                            this.$router.push('/');
                            return
                        }
                        resolve()
                    })
                })
                .then(()=> {
                    if(this.mygoodlist.length==0){
                        setTimeout(() => {
                            alert('您还没发布过任何商品');
                        }, 500);
                    }  
                })
            },
            getdetail(item){
                this.ok = true;
                this.item = item
                this.time = item.createtime.slice(0,10)
            },
            close(){
                this.ok = !this.ok;
            },
            displaydelete(item){
                this.oktwo = true;
                this.itema = item;
            },
            canceldelete(){
                this.oktwo = false;
            },
            suredelete(){
                this.$http.post('/goods/delmygoods',{'id':this.itema.id,'image':this.itema.productImage}).then((res)=>{
                    if(res.body.errno === 0){
                        alert('删除商品成功');
                        this.oktwo = false;
                        this.getmygoodlist();
                    }else{
                        alert('删除商品失败')
                    }
                })
            },
            displaychange(item){
                this.okthird = true;
                this.itemb = item;
            },
            cancelchange(){
                this.okthird = false;
            },
            save(){
                let photo = this.$refs.photo.files[0];
                if(!this.changetitle){
                    this.changetitle = this.itemb.title;
                }
                if(!this.changecontent){
                    this.changecontent = this.itemb.content;
                }
                if(!this.changeprice){
                    this.changeprice = this.itemb.price;
                }
                if(photo){
                    let picture = new FormData();
                    picture.append("photos",photo);
                    let config = { headers:{"Content-Type":"multipart/form-data"}};
                    this.$http.post('/users/changename',picture,config).then((res) => {
                        if (res.body.errno === 0) {
                            this.productImage = res.body.data;
                    } else {
                        alert(res.body.message)
                    }
                    }).then(() => {
                        return new Promise((resolve, reject) => {
                            let data = {'title':this.changetitle,'content':this.changecontent,'productImage':this.productImage,'price':this.changeprice,'id':this.itemb.id,'pastimage':this.itemb.productImage}
                            var res = this.$http.post('users/savegoods',data);
                            resolve(res)
                        })
                    }
                    ).then((res) => {
                            if (res.body.errno === 0) {
                            // 修改成功
                            alert('修改成功')
                            this.okthird = false;
                            this.changetitle='';
                            this.changecontent='';
                            this.changeprice='';
                            this.getmygoodlist()
                        } else {
                            // 修改失败
                            alert(res.body.message)
                        }
                    })
                }else{
                    let data = {'title':this.changetitle,'content':this.changecontent,'price':this.changeprice,'id':this.itemb.id}
                    this.$http.post('users/savegoodstwo',data).then((res)=>{
                            if (res.body.errno === 0) {
                                // 修改成功
                                alert('修改成功')
                                this.okthird = false;
                                this.changetitle='';
                                this.changecontent='';
                                this.changeprice='';
                                this.getmygoodlist()
                            } else {
                                // 修改失败
                                alert(res.body.message)
                            }
                    })
                }
 
            }
        }
    }
</script>

<style scoped>
.background{
    background-image: url('../../static/img/home-background.jpg');
    background-size:100% 100%;
    height:100%;
    width:1920px;
    position:fixed;
}
.container{
    position: absolute;
    width:1500px;
    left:200px;
    background-color:rgba(255,255,255,0.5);
}
.container .header{
    color:rgba(0,0,0,0.8);
    text-align: center;
    line-height:100px;
    font-size:50px;
    height:100px;
    width:1000px;
    margin-left:240px;
}
.container .mygoods{
    width:1500px;
    padding-bottom:40px;
}
.container .mygoods ul{
    border:2px solid black;
    width:1400px;
    margin-left:50px;
    padding-bottom:30px;
}
.container .mygoods ul li {
    border:2px solid rgba(0,0,0,0.8);
    border-radius:10px;
    height:270px;
    width:270px;
    float:left;
    margin-left:60px;
    margin-top:40px; 
}
.container .mygoods ul li img{
    width:200px;
    height:200px;
    margin-left:35px;
    object-fit: contain;
    cursor: pointer;
}
.container .mygoods ul li p{
    font-size:20px;
    text-align: center
}
.container .mygoods ul .edit{
    position: relative;
    width:35px;
    height:25px;
    line-height:25px;
    text-align:center;
    right:-225px;
    bottom:50px;
    cursor:pointer;
}
.container .mygoods ul .delete{
    position: relative;
    width:35px;
    height:25px;
    line-height:25px;
    text-align:center;
    right:-225px;
    bottom:50px;
    cursor:pointer;
}
.container .mygoods ul .delete:hover,
.container .mygoods ul .edit:hover{
    color:red;
}
.clear{
    clear:both;
}
.mygoods .goodsdetail{
    position:fixed;
    width:750px;
    height:750px;
    background-color:rgba(255,255,255,0.9);
    top:0;
    right:0;
    left:0;
    bottom:0;
    margin:auto;
    border-radius: 10px;
}
.mygoods .goodsdetail .detailimg{
    width:300px;
    height:300px;
    margin-left:220px;
    margin-top:10px;
    object-fit: contain;
}
.mygoods .goodsdetail .title{
    height:50px;
    font-size:25px;
    text-align: center;
    line-height:50px;
}
.mygoods .goodsdetail .content{
    height:170px;
    font-size:18px;
    text-indent:185px;
    word-break: break-all;
    padding-top:10px;
}
.mygoods .goodsdetail .price{
    height:40px;
    width:150px;
    font-size:20px;
    line-height: 40px;
    text-align: center;
    position:absolute;
    bottom: 170px;
    left: 290px;
}
.mygoods .goodsdetail .cishu{
    position:absolute;
    height:40px;
    bottom:10px;
    left:20px;
    font-size:20px;
    line-height: 40px;
    text-align: center;
}
.ifsell{
    position:absolute;
    bottom: 130px;
    left: 30px;
}
.customer{
    position:absolute;
    bottom: 80px;
    left: 30px;
}
.contactway{
    position:absolute;
    left: 240px;
    bottom: 130px;
}
.selltime{
    position:absolute;
    bottom: 80px;
    left: 240px;
}
.mygoods .goodsdetail .username{
    width:230px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    font-size:16px;
    margin-left:510px;
    margin-top:130px;
    position:absolute;
}
.mygoods .goodsdetail .createtime{
    width:300px;
    height:25px;
    text-align: center;
    line-height: 25px;
    font-size: 16px;
    margin-left:480px;
    margin-top:165px;
    position:absolute;
}
.mygoods .goodsdetail .close{
    width:60px;
    height:60px;
    top:0px;
    right:0px;
    position: absolute;
    background:url('../../static/img/close.png') no-repeat center;
    cursor: pointer;
}
.mygoods .submit-delete{
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
}
.mygoods .submit-delete .message{
    margin-top:20px;
    text-align: center;
    font-size:25px;
}
.mygoods .submit-delete .sure-delete{
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
.mygoods .submit-delete .cancel-delete{
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
.mygoods .submit-delete .sure-delete:hover,
.mygoods .submit-delete .cancel-delete:hover{
    background-color:rgba(78, 221, 247, 0.5)
}
.mygoods .changegoods{
    position:fixed;
    width:650px;
    height:750px;
    background-color:rgba(255,255,255,0.9);
    top:0;
    right:0;
    left:0;
    bottom:0;
    margin:auto;
    border-radius: 10px;
}
.mygoods .changegoods .changeheader{
    height:100px;
    font-size:30px;
    line-height: 100px;
    text-align: center;
}
.mygoods .changegoods .changetitle{
    height:100px;
    line-height: 100px;
    text-align: center;
}
.mygoods .changegoods label{
    font-size:25px;
}
.mygoods .changegoods input{
    height:40px;
    width:300px;
    font-size:20px;
    text-indent: 20px;
}
.mygoods .changegoods .changecontent{
    height:260px;
    line-height:100px;
    text-align: center;
}
.mygoods .changegoods .changecontent textarea{
    width:350px;
    height:250px;
    resize: none;
    text-indent: 20px;
    font-size:20px;
}
.mygoods .changegoods .changephoto{
    height:50px;
    line-height: 50px;
    text-align: center;
    padding-left:50px;
}
.mygoods .changegoods .changephoto .changephoto-item{
    width:400px;
    text-indent: 0px;
}
.mygoods .changegoods .changeprice{
    text-align: center;
    padding-left:40px;
}
.mygoods .changegoods .save{
    height:50px;
    width:100px;
    border:1px solid black;
    line-height:50px;
    text-align: center;
    font-size:25px;
    border-radius: 10px;
    display: inline-block;
    margin-top: 80px;
    margin-left:130px;
    cursor: pointer;
}
.mygoods .changegoods .cancle-change{
    height:50px;
    width:100px;
    border:1px solid black;
    line-height:50px;
    text-align: center;
    font-size:25px;
    border-radius: 10px;
    display: inline-block;
    margin-top: 10px;
    margin-left:170px;
    cursor: pointer;
}
.mygoods .changegoods .save:hover,
.mygoods .changegoods .cancle-change:hover{
    background-color:rgba(78, 221, 247, 0.5);
}
.footer{
    position:absolute;
    width:100%;
    height:100px;
    margin-top:200px;
    color:white;
}
.footer .footer-top{
    margin-top:30px;
    height:40px;
    line-height: 40px;
    text-align: center;
    font-size:18px;
}
.footer .foot-bottom{
    text-align: center;
}
</style>