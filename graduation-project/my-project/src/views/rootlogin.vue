<template>
    <div>
        <div class="background"></div>
        <div class="login">
            <div class="header">管理员登录</div>   
            <div class="rootname">
                <input type="text" placeholder="请输入管理员账号" v-model="username">
            </div>
            <div class="rootpassword">
                    <input type="password" placeholder="请输入管理员密码" v-model="password" @keyup.enter="login">
            </div>
            <div class="submit" @click="login">登录</div>
        </div>
        <div class="back" @click="back">返回</div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                username:'',
                password:''
            }
        },
        methods:{
            login(){
                if(!this.username){
                    alert('请输入管理员账号')
                    return
                }
                if(!this.password){
                    alert('请输入管理员密码')
                    return
                }
                let data = {'username':this.username,'password':this.password}
                this.$http.post('/root/login',data).then((res)=>{

                    if (res.body.errno === 0) {
                    // 登录成功
                   this.$router.push('/root')
                } else {
                    // 登录失败
                    alert(res.body.message)
                }
                });
            },
            back(){
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>
.background{
    background-image: url('../../static/img/rootbackground.jpg');
    background-size:100% 100%;
    height:100%;
    width:1920px;
    position:fixed;
}
.login{
    border:1px solid black;
    position:relative;
    height:500px;
    width:400px;
    left:750px;
    top:200px;
    border-radius: 10px;
}
.login .header{
    height:50px;
    line-height: 50px;
    text-align: center;
    font-size:26px;
    margin-top:50px;
}
.login .rootname{
    height:100px;
    margin-top:40px;
    text-align: center;
    line-height: 100px;
}
.login .rootname input{
    width:250px;
    height:35px;
    background:url('../../static/img/root-user.png') no-repeat left;
    text-indent:40px;
    font-size:18px;
    border-radius: 10px;
}
.login .rootpassword{
    height:100px;
    margin-top:20px;
    text-align: center;
    line-height: 100px;
}
.login .rootpassword input{
    width:250px;
    height:35px;
    background:url('../../static/img/root-password.png') no-repeat left;
    text-indent:40px;
    font-size:18px;
    border-radius: 10px;
}
.login .submit{
    border:1px solid black;
    width:200px;
    height:50px;
    text-align: center;
    line-height: 50px;
    margin-left:100px;
    margin-top:40px;
    border-radius: 10px;
    font-size:23px;
    cursor: pointer;
}
.login .submit:hover,
.back:hover{
    background-color:rgba(0,0,0,0.3);
    color:white;
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
</style>