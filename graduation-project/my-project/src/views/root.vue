<template>
    <div>
        <div class="background"></div>
        <div class="header">管理员界面</div>
        <div class="searchuserlist" @click="gouserlist">查看用户列表</div>
        <div class="searchgoodlist" @click="gogoodlist">查看商品列表</div>
        <div class="searchmessagelist" @click="gomessagelist">查看留言列表</div>
        <div class="back" @click="back">返回</div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods:{
            back(){
                this.$router.push('/rootlogin');
            },
            gouserlist(){
                this.$router.push('/rootuserlist');
            },
            gogoodlist(){
                this.$router.push('/rootgoodlist');
            },
            gomessagelist(){
                this.$router.push('/rootmessagelist');
            }
        }
    }
</script>

<style  scoped>
.background{
    background-image: url('../../static/img/rootbackground.jpg');
    background-size:100% 100%;
    height:100%;
    width:1920px;
    position:fixed;
}
.header{
    position: relative;
    height:150px;
    line-height: 150px;
    text-align: center;
    font-size:44px;
}
.searchuserlist{
    position: relative;
    width:300px;
    border:1px solid black;
    height:100px;
    line-height: 100px;
    text-align: center;
    font-size:30px;
    margin-left:810px;
    margin-top:100px;
    border-radius: 10px;
    cursor: pointer;
}
.searchgoodlist{
    position: relative;
    width:300px;
    border:1px solid black;
    height:100px;
    line-height: 100px;
    text-align: center;
    font-size:30px;
    margin-left:810px;
    margin-top:40px;
    border-radius: 10px;
    cursor: pointer;
}
.searchmessagelist{
    position: relative;
    width:300px;
    border:1px solid black;
    height:100px;
    line-height: 100px;
    text-align: center;
    font-size:30px;
    margin-left:810px;
    margin-top:40px;
    border-radius: 10px;
    cursor: pointer;
}
.back{
    position: absolute;
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
.searchuserlist:hover,
.searchgoodlist:hover,
.back:hover,
.searchmessagelist:hover{
    background-color:rgba(0,0,0,0.3);
    color:white;
}
</style>