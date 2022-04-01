<template>
  <div class="personal-push">
    <div class="push-head" @click="gotoPushList">
      独家放送
      <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-youjiantou"></use>
    </svg>
    </div>
    <div class="push-list">
      <div class="push-item" :style="{width: `${100 / (colNum ? colNum : 2)}%`}" @click="gotoPushDetail(item.id)" v-for="item in (pushList ? pushList : allPushList)" :key="item.id">
        <div class="cover-box">
          <img class="push-cover" :src="item.sPicUrl" alt="独家放送图片">
        </div>
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalPush',
  props: ['pushList', 'colNum'],
  data() {
    return {
      limit: 30,
      offset: 0,
      allPushList: []
    }
  },
  mounted() {
    this.getPersonalPushList();
  },
  methods: {
    // 点击独家推送下的mv，进入mv详情
    gotoPushDetail(mvid) {
      this.$router.push(`/video/${mvid}`)
    },
    // 获取独家推送列表数据
    async getPersonalPushList() {
      const {limit, offset} = this;
      let result = await this.$API.reqGetPersonalPushList({limit, offset});
      if (result.code === 200) this.allPushList = result.result;
    },
    // 点击独家推送四个字
    gotoPushList() {
      if (this.$route.path.indexOf('recommend') !== -1) {
        this.$router.push('/push')
      }
    }
  }
}
</script>

<style scoped>
/* 独家放送的样式 */
.personal-push {
  width: 100%;
  margin: .3rem 0;
  height: 100%;
}
.push-head {
  font-size: .4rem;
  font-weight: bold;
  margin-left: .16rem;
  text-align: left;
}
.push-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.push-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: .2rem;
  font-size: .24rem;
}
.cover-box {
  width: 100%;
  position: relative;
}
.push-cover {
  width: 100%;
  border-radius: .16rem;
}
.push-item span {
  text-align: left;
  margin-top: .2rem;
  /* 设置最多显示两行 */
  overflow: hidden;
  text-overflow:ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
}
</style>