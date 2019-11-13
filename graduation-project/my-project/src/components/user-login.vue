<template>
    <div>
        <section v-show="ok">
            <div class="header">
                用户登录
            </div>
            <div class="container">
                <input type="text" class="input-user" v-model="username" placeholder="请输入用户名" maxlength="10" autofocus/><br>
                <input type="password" class="input-password" v-model="password" placeholder="请输入密码" @keyup.enter='login' maxlength="15"/>
                <button class="login-btn" id="btnLogin" @click="login" >登录</button>
                <button class="register-btn" id="btnRegister" @click="toggle">注册</button>
            </div>
        </section>
        <section v-show="error">
            <div class="header">
                用户注册
            </div>
            <div class="container">
                <input type="text" class="input-user" v-model="registerUsername" placeholder="请输入用户名(最多输入10位)" autofocus maxlength="10"/><br>
                <input type="password" class="input-password" placeholder="请输入密码(最多输入15位)" v-model="registerPassword" maxlength="15"/>
                <input type="password" class="re-input-password" placeholder="请再输入密码(最多输入15位)" v-model="repassword" maxlength="15"/>
                <button class="register-btn" id="btnRegister" @click="register" >注册</button>
                <button class="return-login" @click="toggle">返回登录</button>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                username:'',
                password:'',
                ok: true,
                error: false,
                registerUsername:'',
                registerPassword:'',
                repassword:''

            }
        },
        mounted(){

        },
        methods:{
            login(){
                if(!this.username){
                    alert('请输入用户名')
                    return
                }
                if(!this.password){
                    alert('请输入用户密码')
                    return
                }
                let data = {'username':this.username,'password':this.password}
                this.$http.post('/users/login',data).then((res)=>{

                    if (res.body.errno === 0) {
                    // 登录成功
                    // console.log(res.body.message);
                   this.$router.push('/home')
                } else {
                    // 登录失败
                    alert(res.body.message)
                }
                });
            },
            toggle(){
                this.ok = !this.ok;
                this.error = !this.error;
            },
            register(){
                if(!this.registerUsername){
                    alert('请输入用户名')
                    return
                }
                 if(!this.registerPassword){
                    alert('请输入密码')
                    return
                }
                 if(!this.repassword){
                    alert('请再次输入密码')
                    return
                }
                if(this.registerPassword!==this.repassword){
                    alert('两次密码不一致')
                    return
                }
                let data = {'username':this.registerUsername,'password':this.registerPassword}
                new Promise((resolve,reject)=>{
                    this.$http.post('/users/checkusername',data).then((res)=>{
                    if(res.body.errno ===0){
                        // alert(res.body.message);
                        reject(res.body.message);
                    }else{
                        resolve()
                    }
                })
                }).then(res=>{
                this.$http.post('/users/register',data).then((res)=>{
                    if (res.body.errno === 0) {
                    // 注册成功
                    alert('注册成功')
                    this.ok = !this.ok;
                    this.error = !this.error;
                } else {
                    // 注册失败
                    alert(res.body.message)
                }
                })
                }).catch(res=>{
                    alert(res)
                })
            }
        }
    }
</script>

<style  scoped>
.header{
    margin-top:30px;
    margin-left:50px;
    font-size:30px;
    color:rgba(255,255,255,0.6);
}
.container{
    margin-top:50px;
    margin-left: 20px;
    height:350px;
}
.container input{
    height:40px;
    width:300px;
    text-align: center;
    background: transparent;
    color:rgba(255,255,255,0.8);
    border-radius: 5px;
    font-size:20px;
    padding-left:40px;
    text-align: left;
}
.container .input-user{
    margin-bottom: 50px;
    background: url('../../static/img/user.png') left no-repeat;
}
.container .input-password{
    background: url('../../static/img/password.png') left no-repeat;
}
.container .re-input-password{
    margin-top:40px;
    background: url('../../static/img/password.png') left no-repeat;
}
.container .login-btn,
.container .register-btn,
.container .return-login{
    margin-top: 40px;
    margin-left:60px;
    display: block;
    border:none;
    border-radius: 20px;
    outline:none;
    background-color:rgb(104, 189, 214);
    height:50px;
    width:250px;
    color:#fff;
    font-size:20px;
    cursor: pointer;
}
.container .return-login{
    margin-top:15px;
}
.container .login-btn:hover,
.container .register-btn:hover,
.container .return-login:hover
{
    background-color:rgb(103, 207, 255);
}
</style>
