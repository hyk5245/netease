<template>
  <div class="discover-container">
    <TopNavMenu :navMenuList="navMenuList" />
    <router-view></router-view>
  </div>
</template>

<script>
import TopNavMenu from '@/components/TopNavMenu'
export default {
  name: 'DiscoverMusic',
  data() {
    return {
      // 传递给TopNavMenu组件的数据
      navMenuList: [
        {name: '个性推荐', to: '/discover/recommend'},
        {name: '排行榜', to: '/discover/rank'},
        {name: '歌单', to: '/discover/songlist'},
        {name: '歌手', to: '/discover/singer'},
        {name: '最新音乐', to: '/discover/newmusic'},
      ]
    }
  },
  components: {TopNavMenu},
}
</script>

<style scoped>
.discover-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  padding: 0 .4rem 0 .4rem;
}
</style>
// 分页器样式
<style>
.el-pager .number {
  color: #676767 !important;
}
.el-pager .active {
  background-color: #ec4141 !important;
  color: white !important;
}
.pagination {
  margin-top: .2rem;
  margin-bottom: .2rem;
  width: 100%;
}
</style>