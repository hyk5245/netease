<template>
  <div class="comment-container">
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
    <CommentItem title="精彩评论" :comments="hotComments" />
    <CommentItem :title="`最新评论(${total})`" :comments="comments" />
  </div>  
</template>

<script>
import CommentItem from '@/components/CommentItem'
export default {
  name: 'Comment',
  data() {
    return {
      myComment: '',
      limit: 20,
      offset: 0,
      hotComments: [],
      comments: [],
      total: 0
    }
  },
  components: {CommentItem},
  mounted() {
    this.getSongListComment();
  },
  methods: {
    // 获取歌单评论
    async getSongListComment() {
      const {params} = this.$route;
      params.limit = this.limit;
      params.offset = this.offset;
      let result = await this.$API.reqGetSongListComment(params);
      if (result.code === 200) {
        const {hotComments, comments, total} = result;
        this.hotComments = hotComments;
        this.comments = comments;
        this.total = total;
      }
    },
  },
}
</script>

<style scoped>
.comment-container {
  padding: .4rem;
}
.testarea >>> textarea {
  text-align: left;
  height: 1.5rem;
  outline: none;
}
/* 输入框样式 */
.comment-input {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.comment-input >>> button {
  margin-top: .2rem;
}
</style>