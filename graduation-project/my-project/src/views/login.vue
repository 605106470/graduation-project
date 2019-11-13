<template>
    <div class="background">
        <section>
            <div class="header">登录页面</div>
        </section>
        <section>
            <div class="title">
                &nbsp;&nbsp;湖南工业大学——校园二手商品交易平台欢迎您！
            </div>
        </section>
        <!-- 登录框 -->
        <section>
            <div class="login-containter">
                <userlogin></userlogin>
            </div>
        </section>
        <div class="rootlogin" @click=" rootlogin">管理员登录</div>
    </div>
</template>

<script>
    import userlogin from '../components/user-login.vue'
    export default {
        data() {
            return {
                
            }
        },
        methods:{
            rootlogin(){
                this.$router.push('/rootlogin')
            }
        },
        components: {
            userlogin,
        }
    }
</script>

<style scoped>
    .background{
        background-image: url('../../static/img/login-background.jpg');
        background-size:100% 100%;
        height:100%;
        width:100%;
        position:fixed;
        min-width: 1800px;
    }
    .header{
        color:white;
        font-size:50px;
        text-align: center;
    }
    .title{
        position: absolute;
        font-size:80px;
        font-style: oblique;
        width: 1200px;
        top:300px;
        left:50px;
        color:rgba(255, 255, 255, 0.6);
        animation:title 2s;
    }
    @keyframes title{
        0% {color:rgba(255, 255, 255, 0);}
        100% {color:rgba(255, 255, 255, 0.6);}
    }
    .login-containter{
        position: absolute;
        background:transparent;
        top:180px;
        right:100px;
        height: 500px;
        width: 400px;
        border: 5px solid rgba(255,255,255,0.3);;
        border-radius: 10px;
    }
    .rootlogin{
        position:absolute;
        bottom:50px;
        right:50px;
        width: 200px;
        height:50px;
        line-height: 50px;
        font-size:22px;
        text-align: center;
        background-color:rgb(104, 189, 214);
        border-radius: 10px;
        cursor: pointer;
        color:rgba(255, 255, 255, 0.7);
    }
    .rootlogin:hover{
        background-color:rgb(103, 207, 255);
    }
</style>