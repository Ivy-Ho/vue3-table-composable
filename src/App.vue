<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { useTableStore } from '@/stores/table'
const tableStore = useTableStore()
</script>

<template>
  <div
    class="p-[20px]"
    v-loading.fullscreen.lock="tableStore.fullscreenLoading"
    element-loading-background="rgba(0, 0, 0, 0.4)"
    element-loading-text="loading..."
  >
    <nav>
      <RouterLink to="/tableOne">TableOne</RouterLink>
      <RouterLink to="/tableTwo">TableTwo</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>
<style lang="scss" scoped>
nav {
  margin-bottom: 20px;
  a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 2px solid #ddd;
    &:hover {
      color: orange;
    }
  }
  a.router-link-exact-active {
    color: orange;
  }
}
</style>
