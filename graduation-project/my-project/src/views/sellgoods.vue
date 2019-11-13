<template>
    <div>
         <div class="background"></div>
         <!-- 页头 -->
        <headernav></headernav>
        <!-- 发布模块 -->
        <div class="container">
            <div class="header">请填写您要发布的商品详情</div>
            <div class="container-item">
                <label>添加标题：</label><input type="text"  placeholder="请输入标题(最多输入9位)" v-model="title" maxlength="9">
            </div>
            <div class="container-item item-content" >
                <label>内容详情：</label><textarea class="content" placeholder="请输入商品详情与联系方式！！" v-model="content"></textarea>
            </div>
            <div class="container-item" >
                <label>添加图片：</label><input type="file" class="photos" ref="photo">
            </div>
            <div class="container-item">
                <label>价格 : &nbsp;￥ </label>&nbsp;&nbsp;<input type="text" v-model="price" maxlength="6">
            </div>
            <div class="fenlei">
                <label>分类 : &nbsp; </label>&nbsp;&nbsp;<select v-model="fenlei">
                    <option value="electron">家电</option>
                    <option value="daily">日用品</option>
                    <option value="book">书籍</option>
                    <option value="others">其他</option>
                </select>
            </div>
            <input type="submit" class="submit" @click="submit">
        </div>
        <!-- 页尾 -->
        <div class="footer">
            <div class="footer-top">感谢使用本网站，如有更多的意见和建议请联系本站管理员QQ：605106470</div>
            <div class="foot-bottom">Copyright &copy; 2019湖南工业大学版权所有</div>
        </div>
    </div>
</template>

<script>
import headernav from '../components/header-nav.vue'
    export default {
        data(){
            return{
                title:'',
                content:'',
                price:'',
                productImage:'',
                fenlei:''
            }
        },
         components: {
            headernav
        },
        methods:{
            submit(){
                let photo = this.$refs.photo.files[0];
                if(!this.$refs.photo.files[0]){
                    alert('您还未上传图片');
                    return
                }
                if(!this.fenlei){
                    alert('您还未选择分类！')
                    return
                }
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
                        let data = {'title':this.title,'content':this.content,'productImage':this.productImage,'price':this.price,'fenlei':this.fenlei}
                        var res = this.$http.post('users/addgoods',data);
                        resolve(res)
                    })
                }
                ).then((res) => {
                        if (res.body.errno === 0) {
                        // 发布成功
                        alert('发布成功')
                        this.$router.push('/minegoods');
                    } else {
                        // 发布失败
                        alert(res.body.message)
                        this.$router.push('/');
                    }
                })
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
    width:1200px;
    height:750px;
    left:350px;
    position:relative;
    border:1px solid rgba(255,255,255,0.6);
    background:rgba(0,0,0,0.8);
    border-radius: 10px;
}
.container .header{
    color:rgba(255,255,255,0.6);
    height:100px;
    text-align: center;
    line-height: 100px;
    font-size:32px;
}
.container label{
    color:rgba(255,255,255,0.6);
    font-size:25px;
}
.container .container-item{
    text-align: center;
    height:100px;
    line-height: 100px;
}
.fenlei{
    text-align: center;
    height:50px;
    line-height: 50px;
}
.container .item-content{
    height:200px;
    line-height: 200px;
}
.container .container-item input{
    width:400px;
    height:30px;
    font-size:16px;
    text-indent: 20px;
}
.container .container-item .photos{
    background:rgba(255,255,255,0.8);
    text-indent:0px;
}
.container .container-item .content{
    height:160px;
    width:400px;
    margin-top:20px;
    resize: none;
    font-size:20px;
    text-indent: 20px;
}
.container .item-content label{
    margin-bottom:20px;
}
.container .submit{
    width:200px;
    height:50px;
    margin-left:525px;
    margin-top: 30px;
    background-color:rgb(104, 189, 214);
    color:#fff;
    font-size:20px;
    border-radius: 20px;
    outline:none;
    cursor: pointer;
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