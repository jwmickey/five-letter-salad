<script setup lang="ts">
defineProps<{
  title: string;
  backPath?: string;
  hideMenu?: boolean;
}>();
</script>

<template>
  <nav>
    <div class="nav">
      <div class="lft">
        <router-link v-if="backPath" :to="backPath">Back</router-link>
      </div>
      <div class="title">{{ title }}</div>
      <div class="rgt">
        <router-link v-if="!hideMenu" to="/menu">Menu</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.nav > div {
  flex: 0;
  padding: 4px;
  flex-basis: 40px;
}

.nav > div:last-child {
  justify-self: flex-end;
}

.nav .title {
  flex: 2;
  font-size: 1.5rem;
  padding: 2px 4px;
  text-align: center;
}
</style>
