<template>
  <div v-if="this.songList.length > 0" class="recommend-container">
    <div class="recommend-main-text" @click="gotoSongList">
      推荐歌单
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-youjiantou"></use>
      </svg>
    </div>
    <SongListTable :songList="songList" />
    <!-- 这里写独家放送 -->
    <PersonalPush :pushList="pushList" :colNum="3" />
  </div>
  <div v-else>
    <Null />
  </div>
</template>

<script>
import SongListTable from '@/components/SongListTable'
import PersonalPush from '@/pages/PersonalPush'
export default {
  name: 'Recommend',
  data() {
    return {
      songList: [], // 存储网友推荐的歌单
      pushList: [], // 存储独家推送数据
      total: 0,
      pagerCount: 9,
      offset: 0,
      limit: 10,
    }
  },
  components: {SongListTable, PersonalPush},
  mounted() {
    this.getSongListByNetFriend();
    this.getPersonalPush();
  },
  methods: {
    // 获取网友推荐的歌单
    async getSongListByNetFriend() {
      let result = await this.$API.reqGetSongListByNetFriend({limit: this.limit, offset: this.offset});
      if (result.code === 200) {
        this.songList = result.playlists;
        this.total = result.total
      }
    },
    // 点击调转到歌单页面
    gotoSongList() {
      this.$router.push('/discover/songlist');
    },
    // 获取独家推送数据
    async getPersonalPush() {
      let result = await this.$API.reqGetPersonalPush();
      if (result.code === 200) this.pushList = result.result
    },
  },
}
</script>

<style scoped>
.recommend-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.recommend-main-text {
  font-size: .4rem;
  font-weight: bold;
  margin-left: .16rem;
}
</style>
