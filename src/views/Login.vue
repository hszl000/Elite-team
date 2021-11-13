<script setup lang="ts">
    // 引入 reavtive 与 （组件实例对象）
    import {reactive,getCurrentInstance } from "vue"
    // 引入icon图标
    import {Edit} from '@element-plus/icons'
    // 引入message弹框
    import { ElMessage } from 'element-plus'
    // 引入hook封装的axios
    import Axios from '../Hook/Axios'
    // 引入vuex
    import $store from '../store/index'
    const ruleForm = reactive({
        username:'林大🌳',
        password:'',
    })
    // 获取使用路由
    const { proxy } = getCurrentInstance()
    // proxy是组件实例，
    // console.log(proxy.$root.$route)
    // console.log(proxy.$root.$router)


    // 定义校验信息
    const rules = reactive({
        username: [
          {required: true,message: '请输入用户名！',trigger: 'blur'},
          { min: 2, max: 10, message: '用户名长度在 2 到 10 个字符', trigger: 'blur' },
        ],
        password: [
          {required: true,message: '请输入密码！',trigger: 'blur'},
          { min: 6, max: 18, message: '密码长度在 6 到 18 个字符', trigger: 'blur' },
        ],
    })
    
    let submitForm = async ()=>{
        let {username,password} = ruleForm
        if(username.trim() && password.trim()){
            let state = await Axios('/login','post')
            let {data} = state
            if(data.name == 'hszl'){
                // 请求到的数据
                let  {user:{account,password}} =  data
                // 用户输入的数据
                let {username,password:pass} = ruleForm
                if(username == account && pass == password){
                    ElMessage({
                        message:'登陆成功,请稍后。。。',
                        type:'success'
                    })
                    //数据存储vuex
                    $store.commit('user',data)
                    // 跳转路由
                    proxy.$root.$router.replace('/home')
                }else{
                    ElMessage({
                        message:'账号或密码错误',
                        type:'error'
                    })
                }
            }else{
                // 登录出错
                ElMessage({
                    message:'请检测本地网络',
                    type:'error'
                })
            }
        }else{
            // 未填写完成时点击登录
            ElMessage({
                    message:'请按照规格进行登录',
                    type:'error'
                })
        }
    }

    let resetForm = ()=>{
        // 获取本地数据的键
        let keys = Object.keys(ruleForm)
        // 清空
        keys.forEach(item=>{
            ruleForm[item] = ''
        })
    }
</script>

<template>
    <div class="Login-div">
        <div class="login">
            <h3>欢迎登陆~</h3>
            <el-form
                :model="ruleForm"
                :rules="rules"
                class="demo-ruleForm"
                label-width="auto"
            >
            <!-- username -->
                <el-form-item prop="username">
                    <el-input placeholder="请输入用户名" v-model="ruleForm.username"></el-input>
                </el-form-item>
            <!-- passwrod -->
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password"></el-input>
                </el-form-item>
            <!-- 按钮 -->
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<style scoped>
    .Login-div{
        width: 100vw;
        height: 100vh;
        background: url(../assets/bg.jpeg) no-repeat;
        background-size: 100% 100%;
        position: relative;
    }
    .login{
        width: 20rem;
        padding: 20px;
        background:rgba(253, 247, 247, 0.795);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
        border-radius: 10px;
    }
    h3{
        margin: 10px 0px;
    }
</style>