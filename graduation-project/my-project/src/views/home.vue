<template>
    <div>
        <div class="background"></div>
        <!-- 页头 -->
        <headernav></headernav>
        <!-- 轮播图 -->
        <slider></slider>
        <!-- 搜索框和通知 -->
        <div class="search">
            <div class="search-left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;管理员通告：如各位用户忘记用户密码可以咨询管理员进行密码的重置 联系qq:605106470</div>
            <div class="search-right">
                <input type="text" placeholder="请输入您想要搜索的内容" @keyup.enter="logosearch" v-model="keyword">
                <div class="search-logo" @click="logosearch"></div>
            </div>
        </div>
        <!-- //商品展示列表 -->
        <div class="goodslist">
            <div class="topcishu" v-bind:class="{'newbackgroundtwo':isActivetwo}" @click="hot">最热<img src="../../static/img/topcishu.png"></div>
            <div class="topnew" v-bind:class="{'newbackground':isActive}" @click="recent">最新<img src="../../static/img/new.png" ></div>
            <div class="classfication">
                <span class="span1" @click="fenleiall" v-bind:class="{'newbackgroundtwo':isActiveall}">全部</span>
                <span @click="fenleifirst" v-bind:class="{'newbackgroundtwo':isActiveele}">电器</span>
                <span @click="fenleisecond" v-bind:class="{'newbackgroundtwo':isActiveday}">日用品</span>
                <span @click="fenleithird" v-bind:class="{'newbackgroundtwo':isActivebook}">书籍</span>
                <span @click="fenleiothers" v-bind:class="{'newbackgroundtwo':isActiveother}">其他</span>
            </div>
            <ul class="ul">
                <li v-for="item in goodslist">
                    <!-- 图片框 -->
                    <img v-bind:src= "'../../../static/goodphotos/'+ item.productImage" @click="getdetail(item)">
                    <!-- 标题栏 -->
                    <p>{{item.title}}</p>
                    <!-- 价格 -->
                    <p class="price">￥{{item.price}}</p>
                    <div class="addcart" @click="addcart(item)">添加购物车</div>
                </li>
            </ul>
            <!-- 显示商品详情 -->
            <div v-show="ok" class="goodsdetail">
                <img v-bind:src= "'../../../static/goodphotos/'+ item.productImage" class="detailimg">
                <div class="title">{{item.title}}</div>
                <div class="content">商品详情: {{item.content}}</div>
                <div class="price">￥{{item.price}}</div>
                <div class="cishu">被浏览次数：{{item.cishu}}</div>
                <div class="username">发布人：{{item.username}}</div>
                <div class="createtime">发布时间：{{time}}</div>
                <!-- 关闭按钮 -->
                <div class="close" @click="close"></div>
            </div>
            <!-- 翻页 -->
            <div class="min" @click="minpage"></div>
            <div class="back" @click="reducepage"></div>
            <div class="next" @click="addpage"></div>
            <div class="max" @click="maxpage"></div>
        </div>
         <!-- 页尾 -->
        <div class="footer">
            <div class="footer-top">感谢使用本网站，如有更多的意见和建议请联系本站管理员QQ：605106470</div>
            <div class="foot-bottom">Copyright &copy; 2019湖南工业大学版权所有</div>
        </div>
        <!-- 留言板功能 -->
        <!-- 留言板 -->
        <div class="messageBoard" @click="displayBoard">留言板</div>
        <div v-show="messageok" class="displaymessageBoard" >
            <div class="addmessage" @click="displayprintmessage">我要留言</div>
            <div class="closedisplaymessageBoard" @click="closeBoard"></div>
            <div class="allmessage">
                <ul class="allmessage-ul">
                    <li v-for="messageitem in getallmessage" class="allmessage-li">
                        <div class="message-username">{{messageitem.username}}</div>
                        <div class="message-time">{{messageitem.createtime|getTime}}</div>
                        <div class="message-content">{{messageitem.content}}</div>
                        <div class="canceldisplaycomment" @click="showoffcomment">收起评论</div>
                        <div class="displaycomment" @click="showcomment(messageitem)">查看评论</div>
                        <div class="comment" @click="displayprintcomment(messageitem)">回复</div>
                        <ul class="allcomment-ul">
                            <li v-for="commentitem in getcomment" class="allcomment-li"  v-show="(messageitem.id==commentitem.id)&&commentok">
                                <div class="comment-username">{{commentitem.username}}</div> 
                                <div class="comment-time">{{commentitem.createtime|getTime}}</div> 
                                <div class="comment-content">{{commentitem.content}}</div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div v-show="printmessageok" class="printmessage">
                <div class="label">请输入留言：</div>
                <textarea placeholder="请输入内容！" v-model="liuyan"></textarea>
                <div class="submitmessage" @click="addmessage">确认</div>
                <div class="cancelmessage" @click="closeprintmessage">取消</div>
            </div>
            <div v-show="printcommentok" class="printcomment">
                <div class="label" >请输入评论：</div>
                <textarea placeholder="请输入内容！" v-model="pinglun" ></textarea>
                <div class="submitcomment" @click="addcomment">确认</div>
                <div class="cancelcomment" @click="closeprintcomment">取消</div>         
            </div>
        </div>
        <!-- 查看我的留言 -->
        <div class="mymessageBoard" @click="displaymyBoard">我的留言</div>
        <div class="displaymymessageBoard" v-show="mymessageok">
            <div class="Boardheader">我的留言</div>
            <div class="closedisplaymymessageBoard" @click="closemyBoard"></div>
            <div class="allmymessage">
                <ul class="allmymessage-ul">
                    <li class="allmymessage-li" v-for="mymessage in getallmymessage">
                        <div class="message-username">{{mymessage.username}}</div>
                        <div class="message-time">{{mymessage.createtime|getTime}}</div>
                        <div class="message-content">{{mymessage.content}}</div>
                        <div class="canceldisplaycomment" @click="showoffcommenttwo">收起评论</div>
                        <div class="displaycomment" @click="showcommenttwo(mymessage)">查看评论</div>
                        <div class="delmymessage" @click="delmymessage(mymessage)" >删除</div>
                        <!-- 渲染评论 -->
                        <ul class="allcomment-ul">
                            <li v-for="commentitemtwo in getcommenttwo" class="allcomment-li" v-show="(mymessage.id==commentitemtwo.id)&&commentoktwo" >
                                <div class="comment-username">{{commentitemtwo.username}}</div> 
                                <div class="comment-time">{{commentitemtwo.createtime|getTime}}</div> 
                                <div class="comment-content">{{commentitemtwo.content}}</div>
                            </li>
                        </ul>
                    </li>
                </ul>
                <!-- 提示是否删除 -->
                <div v-show="delok" class="submit-delete">
                    <div class="delheader">是否确认删除留言？</div>
                    <div class="sure-delete" @click="submitdelmessage">确认</div>
                    <div class="cancel-delete" @click="canceldelete">取消</div>
                </div>
            </div>
        </div>
        <div class="mycart" @click="gomycart">购物车</div>
        <div class="mybuygoods" @click="gobuygoods">我买到的</div>
    </div>
</template>

<script>
import headernav from '../components/header-nav.vue'
import slider from '../components/slider.vue'
    export default {
        data(){
            return {
                goodslist:[],
                alllist:[],
                page:1,
                keyword:'',
                searchalllist:[],
                repage:1,
                ok:false,
                item:{},
                time:'',
                hotpage:'',
                isActive:true,
                isActivetwo:false,
                messageok:false,
                printmessageok:false,
                liuyan:'',
                getallmessage:[],
                printcommentok:false,
                messageid:{},
                pinglun:'',
                commentok:true,
                commentid:{},
                getcomment:[],
                mymessageok:false,
                getallmymessage:[],
                commentidtwo:{},
                getcommenttwo:[],
                commentoktwo:true,
                delmymessageid:{},
                delok:false,
                cartitem:{},
                isActiveall:true,
                isActiveele:false,
                isActiveday:false,
                isActivebook:false,
                isActiveother:false
            }
        },
        mounted(){
            this.getgoodslist(),
            this.getalllist()
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
        components: {
            headernav,
            slider
        },
        methods:{
            getgoodslist(){
                 this.$http.post('/goods/getlist',{'page':this.page,'topcishu':this.hotpage}).then((res)=>{

                    if (res.body.errno === 0) {
                    
                   this.goodslist=res.data.data
                } 
                });
            },
            getalllist(){
                 this.$http.get('/goods/getalllist').then((res)=>{

                    if (res.body.errno === 0) {
                    
                   this.alllist=res.data.data
                } 
                });
            },
            logosearch(){
               if(this.keyword){
                   if(this.keyword=="electron"){
                        this.isActiveall=false;
                        this.isActiveele=true;
                        this.isActiveday=false;
                        this.isActivebook=false;
                        this.isActiveother=false;
                   }else if(this.keyword=="daily"){
                        this.isActiveall=false;
                        this.isActiveele=false;
                        this.isActiveday=true;
                        this.isActivebook=false;
                        this.isActiveother=false;
                   }else if(this.keyword=="book"){
                        this.isActiveall=false;
                        this.isActiveele=false;
                        this.isActiveday=false;
                        this.isActivebook=true;
                        this.isActiveother=false;
                   }else if(this.keyword=="others"){
                        this.isActiveall=false;
                        this.isActiveele=false;
                        this.isActiveday=false;
                        this.isActivebook=false;
                        this.isActiveother=true;
                   }else{
                       this.isActiveall=false;
                        this.isActiveele=false;
                        this.isActiveday=false;
                        this.isActivebook=false;
                        this.isActiveother=false;
                   }
                this.repage=1
                this.$http.post('/goods/searchList',{'keyword':this.keyword,'repage':this.repage}).then((res)=>{
                     if (res.body.errno === 0) {
                   this.goodslist=res.data.data
                         }
                     })
               }else{
                   this.page=1
                   this.isActiveall=true;
                   this.isActiveele=false;
                   this.isActiveday=false;
                   this.isActivebook=false;
                   this.isActiveother=false;
                   this.getgoodslist()
               }
               this.searchAllList();
            },
            searchlist(){
                this.$http.post('/goods/searchList',{'keyword':this.keyword,'repage':this.repage}).then((res)=>{
                     if (res.body.errno === 0) {
                   this.goodslist=res.data.data
                         }
                     })
               },
            // 获取含有关键字的所有列表
            searchAllList(){
                this.$http.post('/goods/searchalllist',{'keyword':this.keyword}).then((res)=>{
                     if (res.body.errno === 0) {       
                   this.searchalllist=res.data.data
                }
                })
            },
            addpage(){
                let length=Math.ceil(this.alllist.length/8);       
                if(this.keyword){
                    // this.searchAllList()
                    this.$http.post('/goods/searchalllist',{'keyword':this.keyword}).then((res)=>{
                     if (res.body.errno === 0) {            
                   this.searchalllist=res.data.data
                }
                }).then(() => {
                    return new Promise((resolve, reject) => {
                    let relength=Math.ceil(this.searchalllist.length/8);
                    resolve(relength)
                    })
                }).then((relength)=> {
                    if(this.repage==relength){
                        return
                    }
                    this.repage++
                    this.searchlist()
                })    
                }else{
                     if(this.page==length){
                    return
                    }
                    this.page++;
                    this.getgoodslist()
                }
                
            },
            reducepage(){
                if(this.keyword){
                    if(this.repage==1){
                        return
                    }
                    this.repage--
                    this.searchlist()
                }else{
                    if(this.page==1){
                    return
                    }
                    this.page--;
                    this.getgoodslist()
                }

            },
            minpage(){
                if(this.keyword){
                    this.repage=1;
                    this.searchlist()
                }else{
                    this.page=1;
                    this.getgoodslist()
                }
            },
            maxpage(){
                if(this.keyword){
                    let relength=Math.ceil(this.searchalllist.length/8);
                    this.repage=relength;
                    this.searchlist()
                }else{
                    let length=Math.ceil(this.alllist.length/8);
                    this.page=length;
                    this.getgoodslist()
                }
            },
            getdetail(item){
                this.ok = true;
                this.item = item
                this.time = item.createtime.slice(0,10);
                this.$http.post('/goods/cishu',{'id':this.item.id,'cishu':this.item.cishu,'username':this.item.username}).then((res)=>{
                     if (res.body.errno === 0) {       
                        //  this.getgoodslist()
                }
                })

            },
            close(){
                this.ok = !this.ok;
            },
            hot(){
                this.hotpage=3;
                this.page=1;
                this.isActive=false;
                this.isActivetwo=true;
                this.keyword='';
                this.getgoodslist();
            },
            recent(){
                this.hotpage='';
                this.page=1;
                this.isActive=true;
                this.isActivetwo=false;
                this.keyword='';
                this.getgoodslist();
            },
            displayBoard(){
                this.messageok=true;
                this.getallMessage();
            },
            closeBoard(){
                this.messageok=false;
            },
            displayprintmessage(){
                this.printmessageok=true;
            },
            closeprintmessage(){
                this.printmessageok=false;
            },
            addmessage(){
                if(!this.liuyan){
                    alert('请输入留言内容');
                    return
                }
                this.$http.post('/users/addmessage',{'liuyan':this.liuyan}).then((res)=>{
                     if (res.body.errno === 0) {       
                        alert('发布留言成功');
                        this.printmessageok=false;
                        this.getallMessage();
                    }else{
                        alert("您还未登录,请先登录！");
                            this.$router.push('/');
                            return
                    }
                })
            },
            getallMessage(){
                this.$http.get('/users/getallmessage').then((res)=>{
                    if (res.body.errno === 0) {    
                    this.getallmessage=res.data.data
                 } 
                })
            },
            displayprintcomment(messageitem){
                this.printcommentok=true;
                this.messageid=messageitem;
            },
            closeprintcomment(){
                this.printcommentok=false;
            },
            addcomment(){
                 if(!this.pinglun){
                    alert('请输入评论内容');
                    return
                }
                 this.$http.post('/users/addcomment',{'pinglun':this.pinglun,'id':this.messageid.id}).then((res)=>{
                     if (res.body.errno === 0) {       
                        alert('发布评论成功');
                        this.printcommentok=false;
                        this.getallMessage();
                    }else{
                        alert("您还未登录,请先登录！");
                            this.$router.push('/');
                            return
                    }
                })
            },
            showcomment(messageitem){
                // messageitem.show=!messageitem.show;
                this.commentid=messageitem;
                new Promise((resolve,reject)=> {
                    this.$http.post('/users/getcomment',{'id':this.commentid.id}).then((res)=>{
                     if (res.body.errno === 0) {       
                        this.getcomment=res.data.data;
                        resolve();
                    }
                })
                }).then(res=>{
                    this.commentok=true;
                    if(this.getcomment.length==0){
                        alert('该留言暂时还没有评论喔!')
                    }
                })  
            },
            // getcommentlist(){
            //     console.log(this.commentid.id);
            //     this.$http.post('/users/getcomment',{'id':this.commentid.id}).then((res)=>{
            //         console.log(res.body.errno);
            //          if (res.body.errno === 0) {       
            //             this.getcomment=res.data.data;
            //              console.log(res.data.data + "111");
            //         }
            //     })
            // },
            showoffcomment(){
               this.commentok=false;
            },
            displaymyBoard(){
                this.mymessageok=true;
                this.getmymessage();
            },
            closemyBoard(){
                this.mymessageok=false;
            },
            //用户获取自己的留言
            getmymessage(){
                this.$http.get('/users/getallmymessage').then((res)=>{
                    if (res.body.errno === 0) {    
                    this.getallmymessage=res.data.data
                 } else{
                        alert("您还未登录,请先登录！");
                            this.$router.push('/');
                            return
                    }
                })
            },
            showcommenttwo(mymessage){
                this.commentidtwo=mymessage;
                new Promise((resolve,reject)=> {
                    this.$http.post('/users/getcomment',{'id':this.commentidtwo.id}).then((res)=>{
                     if (res.body.errno === 0) {       
                        this.getcommenttwo=res.data.data;
                        resolve();
                    }
                })
                }).then(res=>{
                    this.commentoktwo=true;
                    if(this.getcommenttwo.length==0){
                        alert('该留言暂时还没有评论喔!')
                    }
                })  
            },
            showoffcommenttwo(){
                this.commentoktwo=false;
            },
            delmymessage(mymessage){
                this.delmymessageid=mymessage;
                this.delok=true;
            },
            canceldelete(){
                this.delok=false;
            },
            submitdelmessage(){
                this.$http.post('/users/delmyliuyan',{'id':this.delmymessageid.id}).then((res)=>{
                    if(res.body.errno === 0){
                        alert('删除留言成功');
                        this.delok=false;
                        this.getmymessage();
                    }else{
                        alert('删除留言失败')
                    }
                })
            },
            // 各种分类
            fenleifirst(){
                this.keyword='electron';
                this.isActive=false;
                this.isActivetwo=false;
                this.logosearch();
            },
            fenleiall(){
                this.keyword='';
                this.isActive=true;
                this.isActivetwo=false;
                this.logosearch();
            },
            fenleisecond(){
                this.keyword='daily';
                this.isActive=false;
                this.isActivetwo=false;
                this.logosearch();
            },
            fenleithird(){
                this.keyword='book';
                this.isActive=false;
                this.isActivetwo=false;
                this.logosearch();
            },
            fenleiothers(){
                this.keyword='others';
                this.isActive=false;
                this.isActivetwo=false;
                this.logosearch();
            },
            // 去我的购物车
            gomycart(){
                this.$router.push('/mycart');
            },
            // 点击商品添加到购物车
            addcart(item){
                this.cartitem=item;
                new Promise((resolve,reject)=>{
                    this.$http.post('/users/checkgoodsname',{'id':this.cartitem.id}).then((res)=>{
                    if(res.body.errno ===0){
                        reject(res.body.message);
                    }else{
                        resolve()
                    }
                })
                }).then(res=>{
                this.$http.post('/users/addmycart',{'title':this.cartitem.title,'productImage':this.cartitem.productImage,'content':this.cartitem.content,'sellername':this.cartitem.username,'price':this.cartitem.price,'id':this.cartitem.id}).then((res)=>{
                    if(res.body.errno ===0){
                        alert('添加购物车成功!')
                    }else{
                        alert(res.body.message);
                }
                })
                }).catch(res=>{
                    alert(res)
                })
            },
            gobuygoods(){
                this.$router.push('/buygoods');
            }
        }
    }
</script>

<style  scoped>
*{
    overflow-x:hidden;
}
.background{
    background-image: url('../../static/img/home-background.jpg');
    background-size:100% 100%;
    height:100%;
    width:1920px;
    position:fixed;
}
.search{
    height:102px;
    width:1500px;
    margin-top:50px;
    /* border:1px solid red; */
    position:relative;
    margin-bottom: 200px;
    left:200px;
}
.search .search-left{
    height:80px;
    width:500px;
    position:absolute;
    color:rgba(255,255,255,0.6);
    font-size:20px;
    padding-top:20px;
}
.search .search-right{
    position:absolute;
    width:700px;
    height:80px;
    top:10px;
    right:80px;
    line-height:80px;
}
.search .search-right input{
    height:35px;
    font-size:20px;
    width:500px;
    margin-left:50px;
    background: rgba(211,211,211,0.6);
    text-indent: 20px;
    border-radius: 10px;
}
.search .search-right .search-logo{
    position:absolute;
    height:45px;
    width:45px;
    background-image: url('../../static/img/search-logo.png');
    right:95px;
    top:15px;
    cursor:pointer;
}
.goodslist{
    /* border:1px solid red; */
    background-color:rgba(0,0,0,0.5);
    border-radius:10px;
    height:850px;
    width:1700px;
    position: absolute;
    margin-top:-135px;
    left:100px;
}
.goodslist .topcishu{
    position: absolute;
    width:50px;
    height:130px;
    text-align:center;
    border:2px solid rgba(211,211,211,0.6);
    color:white;
    font-size:28px;
    left:50px;
    bottom:200px;
    border-radius:10px;
    cursor:pointer;
}
.goodslist .topnew{
    position: absolute;
    width:50px;
    height:130px;
    text-align:center;
    border:2px solid rgba(211,211,211,0.6);
    color:white;
    font-size:28px;
    left:50px;
    top:180px;
    border-radius:10px;
    cursor:pointer;
}
.goodslist .topnew img,
.goodslist .topcishu img{
    margin-top:5px;
}
.goodslist .topnew img{
    margin-left:5px;
}
.goodslist .ul{
    width:1590px;
    height:800px;
    padding-left:100px;
}
.goodslist .ul li{
    border:5px solid rgba(211,211,211,0.6);
    border-radius: 10px;
    width:300px;
    height:300px;
    margin-left:60px;
    margin-top:50px;
    float:left;
}
.goodslist .ul li img{
    margin-left:35px;
    width:230px;
    height:230px;
    object-fit: contain;
    cursor: pointer;
}
.goodslist .ul li p{
    color:white;
    font-size:23px;
    text-align: center;
}
.goodslist .goodsdetail{
    position:absolute;
    z-index:5;
    width:650px;
    height:750px;
    background-color:rgba(255,255,255,0.9);
    top:30px;
    left:545px;
    border-radius: 10px;
}
.goodslist .goodsdetail .detailimg{
    width:300px;
    height:300px;
    margin-left:165px;
    margin-top:25px;
    object-fit: contain;
}
.goodslist .goodsdetail .title{
    height:50px;
    font-size:25px;
    text-align: center;
    line-height:50px;
}
.goodslist .goodsdetail .content{
    height:170px;
    font-size:18px;
    text-indent:185px;
    word-break: break-all;
    padding-top:30px;
}
.goodslist .goodsdetail .price{
    height:40px;
    font-size:20px;
    line-height: 40px;
    text-align: center;
}
.addcart{
    width:100px;
    height:30px;
    line-height:30px;
    border:1px solid white;
    color:white;
    background:red;
    position:absolute;
    margin-left:105px;
    margin-top:18px;
    text-align:center;
    cursor: pointer;
}
.goodslist .goodsdetail .cishu{
    position:absolute;
    height:40px;
    bottom:10px;
    left:20px;
    font-size:20px;
    line-height: 40px;
    text-align: center;
}
.goodslist .goodsdetail .username{
    width:230px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    font-size:16px;
    margin-left:415px;
    margin-top:55px;
}
.goodslist .goodsdetail .createtime{
    width:300px;
    height:25px;
    text-align: center;
    line-height: 25px;
    font-size: 16px;
    margin-left:385px;
    margin-top:5px;
}
.goodslist .goodsdetail .close{
    width:60px;
    height:60px;
    top:0px;
    right:0px;
    position: absolute;
    background:url('../../static/img/close.png') no-repeat center;
    cursor: pointer;
}
.goodslist .next,
.goodslist .back
{
    width:150px;
    height:40px;
    /* background:transparent; */
    border:1px solid rgba(211,211,211,0.6);
    cursor: pointer;
    position:absolute;
}
.goodslist .min{
    width:50px;
    height:40px;
    border:1px solid rgba(211,211,211,0.6);
    cursor: pointer;
    background:url('../../static/img/firstpage.png') no-repeat center;
    display:inline-block;
    position:absolute;
    margin-left:415px;
}
.goodslist .max{
    width:50px;
    height:40px;
    border:1px solid rgba(211,211,211,0.6);
    cursor: pointer;
    background:url('../../static/img/lastpage.png') no-repeat center;
    display:inline-block;
    position:absolute;
    margin-left:1275px;
}
.goodslist .next{
    background:url('../../static/img/next.png') no-repeat center;
    display:inline-block;
    margin-left:1055px;
}
.goodslist .back{
    background:url('../../static/img/back.png') no-repeat center;
    margin-left:535px;
    display:inline-block;
}
.goodslist .next:hover,
.goodslist .back:hover,
.goodslist .max:hover,
.goodslist .min:hover,
.goodslist .topcishu:hover,
.goodslist .topnew:hover,
.messageBoard:hover,
.mymessageBoard:hover,
.mycart:hover,
.mybuygoods:hover{
    background-color:rgba(255,255,255,0.5);
}
.footer{
    position:absolute;
    width:100%;
    height:100px;
    margin-top:700px;
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
.newbackground,
.newbackgroundtwo{
    background-color:rgba(255,255,255,0.5);
}
.messageBoard{
    position: fixed;
    width:50px;
    height:120px;
    right:45px;
    bottom:200px;
    font-size:30px;
    text-align: center;
    border:2px solid rgba(211,211,211,0.6);
    border-radius: 10px;
    color:white;
    cursor: pointer;
    z-index:999;
}
.mymessageBoard{
    position: fixed;
    width:50px;
    height:170px;
    right:45px;
    bottom:350px;
    font-size:30px;
    text-align: center;
    border:2px solid rgba(211,211,211,0.6);
    border-radius: 10px;
    color:white;
    cursor: pointer;
    z-index:999;
}
.mycart{
    position: fixed;
    width:50px;
    height:120px;
    right:45px;
    bottom:550px;
    font-size:30px;
    text-align: center;
    border:2px solid rgba(211,211,211,0.6);
    border-radius: 10px;
    color:white;
    cursor: pointer;
    z-index:999;
}
 .displaymessageBoard{
    position: fixed;
    right:0px;
    left:0px;
    top:0px;
    bottom:0px;
    margin:auto;
    width:900px;
    height:800px;
    border-radius: 10px;
    z-index:100;
    background-color:rgb(200, 203, 204);
    overflow:auto;
    overflow-x:hidden;
}
.displaymymessageBoard{
    position: fixed;
    right:0px;
    left:0px;
    top:0px;
    bottom:0px;
    margin:auto;
    width:900px;
    height:800px;
    border-radius: 10px;
    z-index:100;
    background-color:rgb(200, 203, 204);
    overflow:auto;
    overflow-x:hidden;
}
.Boardheader{
    height:40px;
    line-height: 40px;
    text-align: center;
    width:700px;
    margin-left:100px;
    font-size:25px;
    margin-top:10px;
}
.displaymessageBoard .addmessage{
    border:1px solid black;
    width:100px;
    height:50px;
    line-height: 50px;
    text-align: center;
    position:absolute;
    right:100px;
    font-size:20px;
    border-radius: 5px;
    cursor: pointer;
}
.displaymessageBoard .addmessage:hover,
.displaymessageBoard  .printmessage .submitmessage:hover,
.displaymessageBoard  .printmessage .cancelmessage:hover,
.canceldisplaycomment:hover,
.displaycomment:hover,
.comment:hover,
.delmymessage:hover,
.displaymessageBoard  .printcomment .submitcomment:hover,
.displaymessageBoard  .printcomment .cancelcomment:hover,
.submit-delete .sure-delete:hover,
.submit-delete .cancel-delete:hover
{
    background-color:rgba(0,0,0,0.6);
}
.displaymessageBoard .closedisplaymessageBoard{
    position:absolute;
    width:50px;
    height:50px;
    right:35px;
    background:url('../../static/img/close.png') no-repeat center;
    cursor: pointer;
}
.closedisplaymymessageBoard{
    position:absolute;
    width:50px;
    height:50px;
    right:35px;
    top:5px;
    background:url('../../static/img/close.png') no-repeat center;
    cursor: pointer;
}
.displaymessageBoard  .printmessage,
.printcomment{
    position:fixed;
    right:0px;
    left:0px;
    top:0px;
    bottom:0px;
    margin:auto;
    border:1px solid black;
    width:500px;
    border-radius: 10px;
    height:300px;
    background-color:white;
}
.displaymessageBoard  .printmessage .label,
.printcomment .label{
    height:40px;
    line-height: 40px;
    font-size:18px;
}
.displaymessageBoard  .printmessage textarea,
.displaymessageBoard  .printcomment textarea{
    width:495px;
    height:175px;
    resize: none;
    font-size:20px;
    text-indent: 20px;
}
.displaymessageBoard  .printmessage .submitmessage,
.displaymessageBoard  .printcomment .submitcomment{
    position:absolute;
    border:1px solid black;
    width:70px;
    height:40px;
    line-height:40px;
    left:140px;
    bottom:20px;
    text-align: center;
    cursor: pointer;
}
.displaymessageBoard  .printmessage .cancelmessage,
.displaymessageBoard  .printcomment .cancelcomment{
    position:absolute;
    border:1px solid black;
    width:70px;
    height:40px;
    line-height:40px;
    left:300px;
    bottom:20px;
    text-align: center;
    cursor: pointer;
}
.allmessage-ul,
.allmymessage-ul{
    position:absolute;
    width:850px;
    top:100px;
    left:25px;
    padding-bottom:30px;
}
.allmessage-li,
.allmymessage-li{
    border:1px solid black;
    margin-top:30px;
    width:800px;
    margin-left:25px;
    border-radius: 5px;
}
.message-username{
    display: inline-block;
    width:200px;
    padding-left:20px;
}
.message-time{
    display: inline-block;
    width:200px;
    padding-left:20px;
}
.message-content{
    border:1px solid black;
    width:700px;
    margin-left:50px;
    height:80px;
    text-indent: 20px;
}
.canceldisplaycomment{
    border:1px solid black;
    display: inline-block;
    width:80px;
    margin-left:550px;
    text-align: center;
    margin-top:10px;
    cursor: pointer;
}
.displaycomment{
    border:1px solid black;
    display: inline-block;
    width:80px;
    text-align: center;
    margin-left:10px;
    cursor: pointer;
}
.comment,
.delmymessage{
    border:1px solid black;
    display: inline-block;
    width:50px;
    text-align: center; 
    margin-left:10px;
    cursor: pointer;
}
.allcomment-ul{
    width:660px;
    margin-left:100px;
}
.allcomment-li{
    border:1px solid black;
    border-bottom:none;
    width:650px;
}
.allcomment-li .comment-username{
    display: inline-block;
    width:200px;
    padding-left:20px;
}
.allcomment-li .comment-time{
    display: inline-block;
    width:200px;
    padding-left:20px;
}
.allcomment-li .comment-content{
    width:700px;
    margin-left:30px;
    height:40px;
    text-indent: 20px;
}
.submit-delete{
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
.submit-delete .delheader{
    margin-top:20px;
    text-align: center;
    font-size:25px;
}
.submit-delete .sure-delete{
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
.submit-delete .cancel-delete{
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
.classfication{
    position:absolute;
    left:200px;
    top:10px;
    width:500px;
    font-size:20px;
    color:white;
    height:30px;
    line-height:30px;
    text-align:center;
}
.classfication span{
    margin-left:20px;
    cursor: pointer;
}
.mybuygoods{
   position: fixed;
    width:50px;
    height:160px;
    right:45px;
    bottom:20px;
    font-size:30px;
    text-align: center;
    border:2px solid rgba(211,211,211,0.6);
    border-radius: 10px;
    color:white;
    cursor: pointer;
    z-index:999; 
}
</style>