<template>
  <div class="videoshow-container">
    <h2 class="mv-title">{{mvDetail.name}}</h2>
    <video class="video" controls autoplay loop :src="mvUrl"></video>
    <div class="desc-top">发布：{{mvDetail.publishTime}} 播放：{{$UTIL.geToWan(mvDetail.playCount)}}</div>
    <p class="mv-desc">{{mvDetail.desc}}</p>
    <!-- 点赞、收藏、分享 -->
    <div class="detail-circle-box">
      <div class="like">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-good"></use>
        </svg>
        <span class="like-text">赞({{$UTIL.geToWan(mvInfo.likedCount)}})</span>
      </div>
      <div class="collect">
        <svg class="icon collect-icon" aria-hidden="true">
          <use xlink:href="#icon-tianjiadianhuaqia"></use>
        </svg>
        收藏({{$UTIL.geToWan(mvDetail.subCount)}})
      </div>
      <div class="share">
        <svg class="icon share-icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        分享({{$UTIL.geToWan(mvInfo.shareCount)}})
      </div>
    </div>
    <!-- 评论 -->
    <div class="comment-input">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="myComment"
        maxlength="140"
        show-word-limit
        resize="none"
        class="testarea"
      >
      </el-input>
      <el-button type="info" size="mini" plain round>评论</el-button>
    </div>
    <CommentItem title="精彩评论" :comments="mvComments.hotComments ? mvComments.hotComments : ''" />
    <CommentItem :title="`最新评论(${mvComments.total})`" :comments="mvComments.comments ? mvComments.comments : ''" />
  </div>
</template>

<script>
import CommentItem from '@/components/CommentItem'
export default {
  name: 'VideoShow',
  data() {
    return {
      mvUrl: '',
      mvDetail: {},
      mvInfo: {},
      mvComments: {
        comments: [],
        hotComments: [],
        total: 0
      },
      limit: 20,
      offset: 0,
      myComment: ''
    }
  },
  components: {CommentItem},
  mounted() {
    this.getVideoData();
  },
  methods: {
    async getVideoData() {
      const {params} = this.$route;
      // 获取mvUrl
      let mvUrlResult = await this.$API.reqGetMvUrl(params)
      if (mvUrlResult.code === 200) this.mvUrl = mvUrlResult.data.url;
      // 获取mv详情（描述、作者等）
      let mvDetailResult = await this.$API.reqGetMvDetail(params);
      if (mvDetailResult.code === 200) this.mvDetail = mvDetailResult.data
      // 获取mv点赞、转发、评论数据
      let mvInfoResult = await this.$API.reqGetMvInfo(params);
      if (mvInfoResult.code === 200) {
        this.mvInfo = mvInfoResult;
        delete this.mvInfo.code
      }
      // 获取mv评论数据
      this.getCommentData();
    },
    // 获取评论数据
    async getCommentData() {
      const {params} = this.$route;
      const {limit, offset} = this;
      let mvCommentResult = await this.$API.reqGetMvComment({id: params.id, limit, offset});
      if (mvCommentResult.code === 200) {
        const {comments, hotComments, total} = mvCommentResult;
        this.mvComments.comments = comments;
        this.mvComments.hotComments = hotComments;
        this.mvComments.total = total
      }
    }
  }
}
</script>

<style scoped>
.videoshow-container {
  height: 100%;
  padding: .4rem .6rem;
}
.mv-title {
  text-align: left;
  margin-bottom: .4rem;
}
.video {
  width: 100%;
  border-radius: .3rem;
}
.desc-top {
  text-align: left;
  color: #cfcfcf;
  font-size: .2rem;
  margin: .2rem 0;
}
.mv-desc {
  text-align: left;
  font-size: .24rem;
  color: #373737;
}
/* 发表评论样式 */
.testarea >>> textarea {
  text-align: left;
  height: 1.5rem;
  outline: none;
}
.comment-input {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.comment-input >>> button {
  margin-top: .2rem;
}
/* 中间的几个圆角按钮 */
.detail-circle-box {
  display: flex;
  margin: .6rem 0;
}
.like, .collect, .share {
  height: .6rem;
  display: flex;
  align-items: center;
  border-radius: .3rem;
  padding: 0 .2rem;
  color: #373737;
  margin: 0 .2rem;
  border: 1px solid #d8d8d8;
  background-color: white;
}
.like {
  margin-left: 0;
}
.like:hover, .collect:hover, .share:hover {
  background-color: rgb(242,242,242);
}
.like-text {
  margin: 0 .25rem 0 .2rem;
}
.collect-icon {
  width: .4rem;
  height: .4rem;
  margin-right: .1rem;
}
.share-icon {
  width: .32rem;
  height: .32rem;
  margin-right: .1rem;
}
</style>