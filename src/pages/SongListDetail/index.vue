<template>
  <div v-if="this.detailList.coverImgUrl" class="songlist-detail-container">
    <div class="detial-container">
      <img class="cover-image" v-lazy="detailList.coverImgUrl">
      <div class="detail-right">
        <div class="title" :title="detailList.name"><span class="songlist-text">歌单</span>{{detailList.name}}</div>
        <div class="author-createtime">
          <img class="author-avatar" v-lazy="detailList.creator ? detailList.creator.avatarUrl : ''">
          <a class="author-link">{{detailList.creator ? detailList.creator.nickname : ''}}</a>
          <span>{{detailList.createTime | createDate}}创建</span>
        </div>
        <div class="detail-circle-box">
          <div class="play-all">
            <svg class="icon play-icon" aria-hidden="true">
              <use xlink:href="#icon-sanjiao3"></use>
            </svg>
            <span class="playall-text">播放全部</span>
            <svg class="icon play-icon" aria-hidden="true">
              <use xlink:href="#icon-jia"></use>
            </svg>
          </div>
          <div class="collect">
            <svg class="icon collect-icon" aria-hidden="true">
              <use xlink:href="#icon-tianjiadianhuaqia"></use>
            </svg>
            收藏({{$UTIL.geToWan(detailList.subscribedCount)}})
          </div>
          <div class="share">
            <svg class="icon share-icon" aria-hidden="true">
              <use xlink:href="#icon-fenxiang"></use>
            </svg>
            分享({{$UTIL.geToWan(detailList.shareCount)}})
          </div>
        </div>
        <div class="tag">标签: <span v-for="(item, index) in detailList.tags" :key="index"><span class="tag-value-text">{{item}}</span><span v-if="index !== detailList.tags.length - 1"> / </span></span></div>
        <div class="song-num">歌曲: {{musicNum}} &nbsp; 播放: {{$UTIL.geToWan(detailList.playCount)}}</div>
        <div class="introduce" :title="detailList.description">简介: <span>{{detailList.description}}</span></div>
      </div>
    </div>
    <TopNavMenu :navMenuList="navMenuList" />
    <!-- 展示歌曲的表格 -->
    <router-view></router-view>
  </div>
  <div v-else>
    <Null />
  </div>
</template>

<script>
import TopNavMenu from '@/components/TopNavMenu'
export default {
  name: 'SongListDetail',
  data() {
    return {
      detailList: {},
    }
  },
  components: {TopNavMenu},
  mounted() {
    this.getSongListDetailById();
  },
  methods: {
    // 获取歌单的详情
    async getSongListDetailById() {
      const {params} = this.$route;
      let result = await this.$API.reqGetSongListDetailById(params);
      if (result.code === 200) {
        this.detailList = result.playlist;
      }
    },
  },
  filters: {
    // 将时间戳转换为年月日
    createDate(mtime) {
      let date = new Date(mtime);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;
      return year + '-' + month + '-' + day;
    }
  },
  computed: {
    musicNum() {
      return this.detailList.trackCount
    },
    navMenuList() {
      return [
        {name: '歌曲列表', to: `/songlist/detail/music/${this.$route.params.id}`},
        {name: `评论(${this.detailList.commentCount})`, to: `/songlist/detail/comment/${this.$route.params.id}`},
        {name: '收藏者', to: `/songlist/detail/collect/${this.$route.params.id}`}
      ]
    }
  }
}
</script>

<style scoped>
.songlist-detail-container {
  width: 100%;
  height: 100%;
}
.detial-container {
  display: flex;
  height: 4rem;
  padding: .4rem;
}
.cover-image {
  height: 100%;
  border-radius: .1rem;
}
.detail-right {
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: .4rem;
  font-size: .24rem;
  overflow: hidden;
}
.title {
  text-align: left;
  width: 100%;
  font-weight: bold;
  font-size: .36rem;
  overflow: hidden; /*自动隐藏文字*/
  text-overflow: ellipsis;/*文字隐藏后添加省略号*/
  white-space: nowrap;/*强制不换行*/
}
.songlist-text {
  display: inline-block;
  padding: 0 .1rem;
  border: 1px solid red;
  font-size: .28rem;
  font-weight: normal;
  color: red;
  border-radius: .08rem;
  margin-right: .1rem;
}
.author-avatar {
  width: .5rem;
  height: .5rem;
  border-radius: .25rem;
  vertical-align: middle;
}
.author-link {
  color: #507daf;
  margin: 0 .1rem;
}
.detail-circle-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
/* 中间的几个圆角按钮 */
.play-all, .collect, .share {
  height: .6rem;
  background-color: #ec4141;
  color: white;
  display: flex;
  align-items: center;
  border-radius: .3rem;
  padding: 0 .2rem;
}
.playall-text {
  margin: 0 .25rem 0 .2rem;
}
.collect, .share {
  color: #373737;
  margin: 0 .2rem;
  border: 1px solid #d8d8d8;
  background-color: white;
}
.collect-icon {
  width: .4rem;
  height: .4rem;
  margin-right: .1rem;
}
.share {
  margin: 0;
}
.share-icon {
  width: .32rem;
  height: .32rem;
  margin-right: .1rem;
}
.tag-value-text {
  color: #507daf;
}
.introduce {
  color: #676767;
  width: 100%;
  overflow: hidden; /*自动隐藏文字*/
  text-overflow: ellipsis;/*文字隐藏后添加省略号*/
  white-space: nowrap;/*强制不换行*/
  text-align: left;
}
</style>