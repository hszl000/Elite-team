<script setup lang="ts">
  import { onMounted, reactive, getCurrentInstance, watch } from 'vue-demi';
  import $store from "../store/index"
  import { ElMessage } from 'element-plus';
  const person = reactive({
    list:[]
  })
  // 组件实例对象
  const {proxy} = getCurrentInstance()
  // 收集当前路由信息
  let  getBreadcrumb = (matched)=>{
      if(matched.length && matched[1].path == '/index'){
        matched = [{path:'/home',name:'home',meta:{title:'首页'}}]
      }
      person.list = matched
      console.log(matched)
  }
  onMounted(()=>{
    getBreadcrumb(proxy.$root.$route.matched)
  })
  // 监听当前路由的变化
  watch(()=>proxy.$root.$route,(val)=>{
    getBreadcrumb(val.matched)
  })

  // 退出函数
  let goBack = ()=>{
    ElMessage.info({
      message:'正在退出...'
    })
    return setTimeout(()=>{
      // 路由跳转
      proxy.$root.$router.replace('/login')
      // 清除本地存储
      sessionStorage.removeItem('user')
      // 浏览器重新刷新
      window.location.reload()
    },300)
  }
</script>

<template>
<div class="top">
  <!-- 面包屑 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="v in person.list" :key="v.path">
      <router-link :to="v.path">{{v.meta.title}}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 退出 -->
  <div>
    <span>{{$store.state.userList.user.account}}</span>
    <el-button class="exit" type="primary" @click="goBack">退出</el-button>
  </div>
</div>
</template>

<style scoped>
.top{
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
