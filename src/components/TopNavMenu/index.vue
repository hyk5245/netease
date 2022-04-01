<template>
  <div class="router-link-container">
    <router-link class="router-link" :to="item.to" v-for="(item, index) in navMenuList" :key="index">{{item.name}}</router-link>
  </div>
</template>

<script>
export default {
  name: 'TopNavMenu',
  data() {
    return {
    }
  },
  props: ['navMenuList'],
}
</script>

<style scoped>
.router-link-active {
  font-size: .5rem;
  font-weight: bold;
  border-bottom: 3px solid #ec4141;
}
.router-link {
  padding: .2rem;
}
.router-link-container {
  display: flex;
  align-items: center;
  margin-bottom: .2rem;
}
</style>