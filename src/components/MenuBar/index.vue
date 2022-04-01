<template>
  <div class="menu-container">
    <div class="menu-top">
      <router-link :to="item.to" v-for="(item, index) in menuTopList" :key="index"><span>{{item.name}}</span></router-link>
    </div>
    <div class="menu-my-music">
      <div class="my-music">
        <span class="my-music-text">我的音乐</span>
      </div>
      <a @click="changeMyMusicClass(index)" :class="{'menu-my-music-active': myMusicCurrentIndex === index}" class="menu-my-music-item" v-for="(item, index) in myMusicList" :key="index">
        <div class="icon-text-box">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#${item.icon}`"></use>
          </svg>
          {{item.name}}
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuBar',
  data() {
    return {
      myMusicList: [
        {icon: 'icon-yinle', name: '本地音乐'},
        {icon: 'icon-xiazai', name: '下载管理'},
        {icon: 'icon-bofang', name: '最近播放'},
        {icon: 'icon-yun', name: '我的音乐云盘'},
        {icon: 'icon-yinleyanzou', name: '我的电台'},
        {icon: 'icon-shoucangwode', name: '我的收藏'}
      ],
      menuTopList: [
        {name: '发现音乐', to: '/discover'},
        {name: '视频', to: '/vedio'},
        {name: '朋友', to: '/friend'},
        {name: '直播', to: '/live'},
        {name: '私人FM', to: '/personal_fm'}
      ],
      menuTopCurrentIndex: 0,   // 菜单栏上面部分的当前索引值
      myMusicCurrentIndex: -1,  // 菜单栏-我的音乐的索引值
    }
  },
  methods: {
    changeMyMusicClass(index) {
      this.myMusicCurrentIndex = index;
      this.menuTopCurrentIndex = -1;
    }
  }
}
</script>

<style scoped>
.menu-container {
  width: 20%;
  border-right: 1px solid #e1e1e1;
  padding: .2rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.menu-top {
  display: flex;
  flex-direction: column;
}
.menu-top a {
  display: inline-block;
  font-size: .32rem;
  width: 100%;
  text-align: left;
  margin: .04rem 0;
  padding: var(--menu-item-padding-top-bottom) 0;
}
.menu-top a:hover {
  background-color: var(--menu-item-hover-active-bgcolor);
}
/* 我的音乐 */
.menu-my-music {
  display: flex;
  flex-direction: column;
}
.menu-my-music-item {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding: var(--menu-item-padding-top-bottom) 0;
}
.menu-my-music-item:hover {
  background-color: var(--menu-item-hover-active-bgcolor);
}
.menu-top a span, .icon-text-box {
  margin-left: var(--menu-item-margin-left);
}
.router-link-active {
  font-size: .4rem !important;
  font-weight: bold;
}
.menu-my-music-active {
  background-color: var(--menu-item-hover-active-bgcolor);
}
.my-music {
  width: 100%;
  text-align: left;
}
.my-music-text {
  color: #999999;
  font-size: .28rem;
  margin-left: var(--menu-item-margin-left);
}
</style>