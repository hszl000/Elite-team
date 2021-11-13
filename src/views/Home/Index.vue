<script setup lang="ts">
  import Aside from '../../components/Aside.vue';
  import Header from '../../components/Header.vue';
</script>

<template>
    <el-container id="container">
      <el-aside class="aside" width="200px">
        <img src="../../assets/logo.png" alt="" class="logo">
        <Aside/>
      </el-aside>
      <el-container>
        <el-header class="header">
          <Header/>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</template>

<style scoped>
.container{
    width: 100%;
    height: 100%;
  }
  .aside{
    background: #343f50;
  }
  .header{
    border-bottom: 1px solid #ebebeb;
  }
  .logo{
    width: 100%;
    opacity: .5;
  }
</style>