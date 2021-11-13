<script setup lang="ts">
import { onMounted, reactive } from 'vue-demi'
import $store from '../store/index'
import  AsideItem  from './AsideItem.vue'
  const person = reactive({});
  onMounted(()=>{
    const {rights} = $store.state.userList.user
    person.items = rights
    console.log(rights)
  })
</script>

<template>
    <el-menu
      :default-active="$route.path" exact
      class="el-menu-vertical-demo"
      background-color="#343f50"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>

      <AsideItem v-for="v in person.items" :key="v.path" :item="v" :basePath="v.path"/>
    </el-menu>
</template>
<style>

</style>