<template>
  <div class="recommend-list">
    <div @click="gotoDetail(item.id)" class="recommend-item" v-for="(item) in songList" :key="item.id">
      <div class="image-box">
        <img class="recommend-item-image" v-lazy="item.coverImgUrl" alt="这是封面图">
        <div class="paly-count-box">
          <svg class="icon t-r-paly-icon" aria-hidden="true">
            <use xlink:href="#icon-yousanjiao"></use>
          </svg>
          <span>{{$UTIL.geToWan(item.playCount)}}</span>
        </div>
        <div class="b-r-paly-icon-box">
          <svg class="icon b-r-paly-icon" aria-hidden="true">
            <use xlink:href="#icon-right-s"></use>
          </svg>
        </div>
      </div>
      <p class="recommend-item-text">{{item.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SongListTable',
  props: ['songList'],
  methods: {
    // 点击进入歌单详情的回调
    gotoDetail(id) {
      this.$router.push(`/songlist/detail/${id}`)
    }
  }
}
</script>

<style scoped>
/* 推荐列表 */
.recommend-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.recommend-item {
  width: 20%;
  padding: .16rem;
}
.image-box {
  position: relative;
}
.image-box:hover .b-r-paly-icon-box {
  opacity: 1;
}
.paly-count-box {
  position: absolute;
  right: .1rem;
  top: .1rem;
  color: white;
  font-size: .2rem;
  display: flex;
  align-items: center;
}
.t-r-paly-icon {
  width: .3rem;
  height: .3rem;
}
.b-r-paly-icon-box {
  position: absolute;
  bottom: .2rem;
  right: .2rem;
  width: .6rem;
  height: .6rem;
  background-color: #ededee;
  border-radius: .3rem;
  justify-content: center;
  align-items: center;
  display: flex;
  opacity: 0;
  transition: opacity .7s;
}
.b-r-paly-icon {
  width: 65%;
  height: 65%;
}
.recommend-item-image {
  width: 100%;
  border-radius: .1rem;
  overflow: hidden;
}
.recommend-item-text {
  font-size: .2rem;
  text-align: left;
  overflow:hidden;
  /* 设置最多显示两行 */
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
}
</style>