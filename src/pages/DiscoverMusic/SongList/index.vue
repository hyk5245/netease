<template>
  <div v-if="this.songList.length > 0" ref="songlistTop">
    <SongListTable :songList="songList" />
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :pager-count="pagerCount"
        @current-change="currentChange">
      </el-pagination>
    </div>
  </div>
  <div v-else>
    <Null />
  </div>
</template>

<script>
import SongListTable from '@/components/SongListTable'
export default {
  name: 'SongList',
  components: {SongListTable},
  data() {
    return {
      songList: [],
      total: 0,
      offset: 0,
      limit: 20,
      pagerCount: 9
    }
  },
  mounted() {
    this.getSongListByNetFriend();
  },
  methods: {
    // 获取网友推荐的歌单
    async getSongListByNetFriend() {
      const {limit, offset} = this;
      let result = await this.$API.reqGetSongListByNetFriend({limit, offset});
      if (result.code === 200) {
        this.songList = result.playlists;
        this.total = result.total
      }
    },
    // 点击分页按钮的回调
    currentChange(index) {
      this.offset = (index - 1) * this.limit;
      this.getSongListByNetFriend();
      this.$bus.$emit('change', this.$refs.songlistTop.offsetTop);
    }
  }
}
</script>

<style scoped>

</style>