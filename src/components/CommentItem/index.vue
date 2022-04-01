<template>
  <div class="comment-box" v-show="comments.length > 0">
    <h3 class="title">{{title}}</h3>
    <div :class="{'no-border-bottom': index === comments.length - 1}" class="comment-item" v-for="(item, index) in comments" :key="item.id">
      <img class="user-avatar" v-lazy="item.user.avatarUrl" alt="用户头像">
      <div class="comment-right">
        <div class="comment"><span class="username">{{item.user.nickname}}</span>：{{item.content}}</div>
        <div class="comment-time-and-like">
          <span>{{item.timeStr + ' ' + (title === '精彩评论' ? getHM(item.time) : '')}}</span>
          <span>
            <svg v-show="!item.liked" class="icon" aria-hidden="true">
              <use xlink:href="#icon-good"></use>
            </svg>
            <svg v-show="item.liked" class="icon" aria-hidden="true">
              <use xlink:href="#icon-dianzan_kuai"></use>
            </svg>{{item.likedCount === 0 ? '' : item.likedCount}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: ['comments', 'title'],
  methods: {
    // 获取时间戳对应的时、分
    getHM(timeStr) {
      return this.$UTIL.getTimeM(timeStr);
    }
  }
}
</script>

<style scoped>
/* 精彩评论样式 */
.comment-box {
  margin: .3rem 0;
}
.user-avatar {
  width: .6rem;
  height: .6rem;
  border-radius: .3rem;
  vertical-align: bottom;
  margin-right: .1rem;
}
.comment-item {
  display: flex;
  justify-content: space-between;
  padding: .4rem 0;
  border-bottom: 1px solid #ccc;
  align-items: center;
  font-size: .22rem;
}
.comment-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.comment {
  text-align: left;
  word-break:break-all;
}
.comment-time-and-like {
  display: flex;
  justify-content: space-between;
  margin-top: .2rem;
}
.title {
  text-align: left;
}
.no-border-bottom {
  border-bottom: none;
}
.username {
  color: #507daf;
}
</style>