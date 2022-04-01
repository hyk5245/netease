<template>
  <div class="aplayer" ref="aplayer"></div>
</template>

<script>
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';
import {mapState} from 'vuex'
export default {
  name: 'Aplayer',
  mounted() {
    this.configAplayer();
  },
  computed: {
    ...mapState(['audioInfo'])
  },
  methods: {
    configAplayer() {
      this.ap = new APlayer({
      container: this.$refs.aplayer,
      mini: false,
      autoplay: false,
      theme: '#FADFA3',
      loop: 'all',
      order: 'list',
      preload: 'auto',
      volume: 0.7,
      mutex: true,
      listFolded: false,
      listMaxHeight: '1.5rem',
      lrcType: 1,
      audio: this.audioInfo,
      storageName: 'netease-cache'
      });
    },
  },
  watch: {
    audioInfo() {
      let len = this.audioInfo.length - 1;
      // 这里如果把之前的销毁了，就会导致点击播放音乐时，播放列表展示的数据异常
      // this.ap.destroy();
      this.configAplayer();
      this.ap.list.switch(len);
      this.ap.play();
    }
  }
}
</script>

<style scoped>
.aplayer {
  width: var(--main-width);
  padding: 0 .4rem;
  margin: 0;
  display: flex;
  min-width: var(--main-min-width);
  max-width: var(--main-max-width);
  height: 1.5rem;
}
.aplayer >>> .aplayer-body {
  flex: 3 !important;
  height: 100% !important;
}
.aplayer-withlrc >>> .aplayer-pic {
  height: 100% !important;
  width: 1.5rem;
}
.aplayer >>> .aplayer-info {
  height: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  padding: 0 !important;
  margin-left: .4rem;
}
.aplayer-withlrc >>> .aplayer-lrc {
  flex: 1 !important;
}
.aplayer >>> .aplayer-list {
  flex: 2 !important;
}
.aplayer >>> li {
  display: flex;
  justify-content: space-between;
}
.aplayer >>> .aplayer-list.aplayer-list-hide {
  flex: 0 !important;
}
</style>