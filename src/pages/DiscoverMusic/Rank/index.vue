<template>
  <div v-if="this.officialRank.length > 0" class="rank-container">
    <div class="official-main-text">
      官方榜
    </div>
    <div class="official-item" >
      <div class="img-box" @click="gotoDetail(item.id)" v-for="(item) in officialRank" :key="item.id">
        <img class="official-img" v-lazy="item.coverImgUrl" alt="这是一张图片">
        <div class="paly-icon-box">
          <svg class="icon paly-icon" aria-hidden="true">
            <use xlink:href="#icon-right-s"></use>
          </svg>
        </div>
      </div>
    </div>
    <div class="global-main-text">
      全球榜
    </div>
    <SongListTable :songList="globalRank" />
  </div>
  <div v-else>
    <Null />
  </div>
</template>

<script>
import SongListTable from '@/components/SongListTable'
export default {
  name: 'Rank',
  data() {
    return {
      officialRank: [],
      globalRank: []
    }
  },
  components: {SongListTable},
  mounted() {
    this.getRankList();
  },
  methods: {
    // 获取排行榜数据
    async getRankList() {
      let result = await this.$API.reqGetRankList();
      if (result.code === 200) {
        this.officialRank = result.list.slice(0, 4);
        this.globalRank = result.list.slice(4);
      }
    },
    // 进入歌单详情
    gotoDetail(id) {
      this.$router.push(`/songlist/detail/${id}`)
    }
  }
}
</script>

<style scoped>
.rank-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.official-main-text, .global-main-text {
  font-size: .4rem;
  font-weight: bold;
  margin-left: .16rem;
}
.global-main-text {
  margin-top: .4rem;
}
/* 官方榜样式 */
.official-item {
  display: flex;
  align-items: center;
}
.img-box {
  position: relative;
  flex: 1;
  padding: .2rem;
}
.official-img {
  width: 100%;
  border-radius: .2rem;
}
.img-box:hover .paly-icon-box{
  display: flex;
}
/* 官方版按钮 */
.paly-icon-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: .6rem;
  height: .6rem;
  background-color: #ededee;
  border-radius: .3rem;
  justify-content: center;
  align-items: center;
  display: none;
  transform: translate(-50%, -50%);
}
.paly-icon {
  width: 65%;
  height: 65%;
}
</style>