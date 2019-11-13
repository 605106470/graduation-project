<template>
    <div class="header">
        <div class="header-left">欢迎进入工大二手交易平台——买我想用，卖你所想！</div>
        <div class="header-right">
            <ul>
                <li class="li1" @click="backhome">首页</li>
                <li class="li2" @click="sellgoods">我要发布</li>
                <li class="li3" @click="minegoods">我的发布</li>
                <li class="li4" @click="zhuxiao">注销</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods:{
            zhuxiao(){
                this.$http.get('/users/zhuxiao').then(res => {
                    if (res.body.errno === 0) {
                        alert('注销成功');
                        this.$router.push('/');
                }
                })
            },
            backhome(){
                this.$http.get('/users/backhome').then(res => {
                    if (res.body.errno === 0) {
                        this.$router.push('/home');
                }
                })
            },
            sellgoods(){
                this.$router.push('/sellgoods')
            },
            minegoods(){
                this.$router.push('/minegoods')
            }
        }
    }
</script>

<style  scoped>
    .header{
        height: 100px;
        width:1890px;
        border:2px solid rgba(255, 255, 255, 0.6);
        color:rgba(255, 255, 255, 0.7);
        border-radius: 10px;
        position:relative;
    }
    .header .header-left{
        font-size:25px;
        font-style: oblique;
        position: absolute;
        width:700px;
        height:100px;
        left:100px;
        line-height:100px;
        text-align: center;
    }
    .header .header-right {
        width:800px;
        height: 100px;
        position:absolute;
        right:0;
        top:0;
    }
    .header .header-right ul li{
        margin-right:20px;
        padding-left:20px;
        margin-left: 20px;
        height:100px;
        width:130px;
        display: inline-block;
        text-align: center;
        line-height:100px;
        font-size:25px;
        cursor: pointer;
    }
    .header .header-right .li1{
         background: url('../../static/img/homepage.png') left no-repeat;
    }
    .header .header-right .li2{
         background: url('../../static/img/add.png') left no-repeat;
         padding-left:40px;
         width:120px;
    }
    .header .header-right .li3{
         background: url('../../static/img/mine.png') left no-repeat;
         padding-left:40px;
         width:120px;
    }
    .header .header-right .li4{
         background: url('../../static/img/zhuxiao.png') left no-repeat;
         margin-right:5px;
    }
    .header .header-right ul li:hover{
        background-color:rgba(0, 0, 0,0.5);
        color:white;
    }
</style>