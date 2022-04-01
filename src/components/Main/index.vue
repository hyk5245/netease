<template>
  <div class="main-container">
    <Header />
    <div class="body">
      <MenuBar />
      <div ref="rightParent" class="right-box">
        <router-view></router-view>
        <el-backtop class="bt" target=".right-box"></el-backtop>
      </div>
    </div>
    <Aplayer />
  </div>
</template>

<script>
import Aplayer from '@/components/Aplayer'
import Header from '../Header'
import MenuBar from '../MenuBar'
export default {
  name: 'Main',
  components: {Header, MenuBar, Aplayer},
  mounted() {
    this.$bus.$on('change', this.change);
  },
  beforeDestroy() {
    this.$bus.$off('change');
  },
  methods: {
    change(value) {
      console.log(`点击分页按钮后，需要指定滚动条距离顶部的距离为${value}`);
      this.$refs.rightParent.scrollTop = value;
    }
  }
}
</script>

<style scoped>
.main-container {
  width: var(--main-width);
  border: 1px solid #ccc;
  height: var(--main-height);
  overflow: hidden;
  min-width: var(--main-min-width);
  min-height: 10.4rem;
  min-height: var(--main-min-height);
  max-width: var(--main-max-width);
  max-height: var(--main-max-heigh);
}
.body {
  display: flex;
  justify-content: space-between;
  height: calc(100% - 2.5rem);
}
.right-box {
  flex: 1;
  overflow: auto;
  position: relative;
}
.right-box >>> .bt {
  position: sticky;
  top: 80%;
  left: 90%;
  color: #ec4141;
}
</style>