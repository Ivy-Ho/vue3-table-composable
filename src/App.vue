<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { useTableStore } from '@/stores/table'
const tableStore = useTableStore()

import { UserFilled, ShoppingBag } from '@element-plus/icons-vue'
</script>

<template>
  <div
    class="p-10"
    v-loading.fullscreen.lock="tableStore.fullscreenLoading"
    element-loading-background="rgba(0, 0, 0, 0.4)"
    element-loading-text="loading..."
  >
    <nav class="flex space-x-5">
      <RouterLink to="/user_table">
        <el-icon class="mr-2"><UserFilled /></el-icon>
        <p>User Table</p>
      </RouterLink>
      <RouterLink to="/product_table">
        <el-icon class="mr-2"><ShoppingBag /></el-icon>Product Table</RouterLink
      >
    </nav>

    <RouterView />
  </div>
</template>
<style lang="scss" scoped>
nav {
  margin-bottom: 20px;
  a {
    display: flex;
    align-items: center;

    &:hover {
      color: orange;
    }
  }
  a.router-link-exact-active {
    color: orange;
  }
}
</style>
