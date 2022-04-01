<template>
  <div class="collect-container">
    <div class="collect-item" v-for="item in subscribers" :key="item.id">
      <img class="user-avartar" v-lazy="item.avatarUrl" alt="用户头像">
      <div class="msg-box">
        <div class="username"><span>{{item.nickname}}</span></div>
        <div class="signature"><span>{{item.signature}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Collect',
  data() {
    return {
      limit: 50,
      offset: 0,
      subscribers: []
    }
  },
  mounted() {
    this.getSongListSubscribers();
  },
  methods: {
    async getSongListSubscribers() {
      const {params} = this.$route;
      params.limit = this.limit;
      params.offset = this.offset;
      let result = await this.$API.reqGetSongListSubscribers(params);
      if (result.code === 200) {
        this.subscribers = result.subscribers;
      }
    }
  },
}
</script>

<style scoped>
.collect-container {
  padding: .4rem;
  display: flex;
  flex-wrap: wrap;
}
.collect-item {
  display: flex;
  align-items: center;
  width: 50%;
  padding: .4rem;
}
.user-avartar {
  width: 1rem;
  height: 1rem;
  border-radius: .5rem;
  margin-right: .1rem;
}
.msg-box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}

.signature, .username {
  margin-top: .2rem;
  font-size: .24rem;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}
.username {
  font-size: .28rem;
}
</style>