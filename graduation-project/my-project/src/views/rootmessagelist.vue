<template>
    <div>
        <div class="background"></div>
        <div class="header">留言列表</div>
        <div class="back" @click="back">返回</div>
        <div class="container">
            <ul class="allmessage-ul">
                <li class="allmessage-li" v-for="message in allmessage" >
                    <div class="message-username">用户名：{{message.username}}</div>
                    <div class="message-time">{{message.createtime|getTime}}</div>
                    <div class="message-id">留言表ID：{{message.id}}</div>
                    <div class="message-content">{{message.content}}</div>
                    <div class="canceldisplaycomment" @click="showoffcomment">收起评论</div>
                    <div class="displaycomment" @click="showcomment(message)">查看评论</div>
                    <div class="delmessage" @click="delmessage(message)">删除</div>
                    <!-- 渲染评论 -->
                    <ul class="allcomment-ul">
                        <li  class="allcomment-li" v-for="commentitem in getcomment" v-show="(message.id==commentitem.id)&&conmentok">
                            <div class="comment-username">用户名：{{commentitem.username}}</div> 
                            <div class="comment-time">{{commentitem.createtime|getTime}}</div> 
                            <div class="comment-content">{{commentitem.content}}</div>
                        </li>
                    </ul>
                </li>
            </ul>
            <!-- 提示是否删除 -->
            <div v-show="delok" class="submit-delete" >
                <div class="delheader">是否确认删除留言？</div>
                <div class="sure-delete" @click="submitdelmessage">确认</div>
                <div class="cancel-delete" @click="canceldelete">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                allmessage:[],
                getcomment:[],
                commentid:{},
                conmentok:false,
                delmessageid:{},
                delok:false
            }
        },
        mounted(){
            this.getallmessage()
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
            getallmessage(){
                this.$http.get('/root/getallmessage').then((res)=>{
                    if (res.body.errno === 0) {    
                    this.allmessage=res.data.data
                 } 
                })
            },
            showcomment(message){
                this.commentid=message;
                new Promise((resolve,reject)=> {
                    this.$http.post('/root/getcomment',{'id':this.commentid.id}).then((res)=>{
                     if (res.body.errno === 0) {       
                        this.getcomment=res.data.data;
                        resolve();
                    }
                })
                }).then(res=>{
                    this.conmentok=true;
                    if(this.getcomment.length==0){
                        alert('该留言暂时还没有评论喔!')
                    }
                })  
            },
            showoffcomment(){
                console.log(this.commentok);
               this.conmentok=false;
            },
            delmessage(message){
                this.delmessageid=message;
                this.delok=true;
            },
            canceldelete(){
                this.delok=false;
            },
            submitdelmessage(){
                this.$http.post('/root/delmessage',{'id':this.delmessageid.id}).then((res)=>{
                    if(res.body.errno === 0){
                        alert('删除留言成功');
                        this.delok=false;
                        this.getallmessage();
                    }else{
                        alert('删除留言失败')
                    }
                })
            }
        }
    }
</script>

<style  scoped>
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
.back:hover{
    background-color:rgba(0,0,0,0.3);
    color:white;
}
.allmessage-ul{
    border:1px solid black;
    position: relative;;
    width:1400px;
    left:270px;
    padding-bottom:25px;
    background-color:#add1d4;
    border-radius: 10px;
}
.allmessage-li{
    border:1px solid black;
    margin-top:30px;
    width:1100px;
    margin-left:145px;
    border-radius: 5px;
    background-color:rgba(255,255,255,1);
}
.message-username{
    display: inline-block;
    width:250px;
    padding-left:55px;
}
.message-time{
    display: inline-block;
    width:200px;
    padding-left:120px;
}
.message-id{
    display: inline-block;
    width:100px;
    padding-left:120px;
}
.message-content{
    border:1px solid black;
    width:1000px;
    margin-left:50px;
    height:80px;
    text-indent: 20px;
}
.canceldisplaycomment{
    border:1px solid black;
    display: inline-block;
    width:80px;
    margin-left:807px;
    text-align: center;
    margin-top:10px;
    cursor: pointer;
    margin-bottom:5px;
}
.displaycomment{
    border:1px solid black;
    display: inline-block;
    width:80px;
    text-align: center;
    margin-left:10px;
    cursor: pointer;
}
.delmessage{
    border:1px solid black;
    display: inline-block;
    width:50px;
    text-align: center; 
    margin-left:10px;
    cursor: pointer;
}
.canceldisplaycomment:hover,
.displaycomment:hover,
.delmessage:hover{
    background-color:rgba(0,0,0,0.6);
}
.allcomment-ul{
    width:660px;
    margin-left:100px;
}
.allcomment-li{
    border:1px solid black;
    border-bottom:none;
    width: 840px;
    margin-left: 110px;
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
.submit-delete .sure-delete:hover,
.submit-delete .cancel-delete:hover
{
    background-color:rgba(0,0,0,0.6);
}
</style>