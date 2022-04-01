<template>
  <div class="newmusic-container">
    <div @dblclick="playMusic(item)" class="song-item" v-for="(item, index) in newSongList" :key="item.id">
      <span class="sequence">{{$UTIL.getIndex(index + 1)}}</span>
      <div class="cover-box">
        <img class="cover" :src="item.picUrl" alt="歌曲封面图">
        <div class="center-icon-box">
          <svg class="icon center-icon" aria-hidden="true">
            <use xlink:href="#icon-right-s"></use>
          </svg>
        </div>
      </div>
      <span class="music-title">{{item.name}}</span>
      <span class="singer">{{item.song.artists[0].name}}</span>
      <span class="album">{{item.song.album.name}}</span>
      <span class="duration">{{$UTIL.getTimeS(item.song.duration)}}</span>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'NewMusic',
  data() {
    return {
      newSongList: [],
      limit: 30
    }
  },
  mounted() {
    this.getNewSong();
  },
  methods: {
    // 获取新音乐数据
    async getNewSong() {
      let result = await this.$API.reqGetNewSong({limit: this.limit});
      if (result.code === 200) this.newSongList = result.result
    },
    ...mapActions(['addMusic']),
    playMusic(music) {
      // 构造播放音乐需要的部分数据
      music.al = {picUrl: music.picUrl};
      music.ar = [{name: music.song.artists[0].name}]
      this.addMusic(music);
    }
  }
}
</script>

<style scoped>
.newmusic-container {
  width: 100%;
}
.song-item {
  height: 1.3rem;
  display: flex;
  align-items: center;
  padding: .2rem;
  font-size: .26rem;
  justify-content: space-between;
  border: 1px solid #ccc;
  color: #656565;
}
.song-item span {
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.cover-box {
  position: relative;
  height: 100%;
}
.center-icon-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: .4rem;
  height: .4rem;
  border-radius: .2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cover {
  height: 100%;
  border-radius: .1rem;
}
.music-title {
  width: 35%;
}
.singer {
  width: 18%;
}
.album {
  width: 20%;
}
.duration {
  margin-left: .2rem;
}
</style>