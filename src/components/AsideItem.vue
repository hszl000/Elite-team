<script setup lang="ts">
        // 引入图标
    import {Location,HomeFilled} from '@element-plus/icons'
    const data = defineProps(['item','basePath'])
    // const icon = {
    //   'HomeFilled':<HomeFilled/>
    // }
</script>

<template>
  <div>
    <!-- 没子集 -->
    <el-menu-item :index="`${basePath}`" v-if="!item.children">
        <el-icon><HomeFilled/></el-icon>
        <span slot="title">{{item.authName}}</span>
    </el-menu-item>

    <!-- 有子集 -->
    <el-sub-menu v-else :index="`${basePath}`" >
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{item.authName}}</span>
          </template>
              <!-- 递归组件调用 -->
            <AsideItem v-for="sub in item.children" :key="sub.path" :item="sub" :basePath="sub.path"/>
        </el-sub-menu>
  </div>
</template>

<style>

</style>