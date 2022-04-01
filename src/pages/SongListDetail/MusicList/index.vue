<template>
  <div class="song-table">
      <div class="song-head">
        <span class="sequence"></span>
        <span class="music-title">音乐标题</span>
        <span class="singer">歌手</span>
        <span class="album">专辑</span>
        <span class="duration">时长</span>
      </div>
      <div @dblclick="playMusic(item)" :class="{'dark-bgcolor': index % 2 === 1}" class="song-item" v-for="(item, index) in musicList" :key="item.id">
        <span class="sequence">
          {{$UTIL.getIndex(index + 1)}}
          <svg class="icon love-icon" aria-hidden="true">
            <use xlink:href="#icon-xiai"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiazai"></use>
          </svg>
        </span>
        <span class="music-title">{{item.name}}</span>
        <span class="singer">{{item.ar[0].name}}</span>
        <span class="album">{{item.al.name}}</span>
        <span class="duration">{{$UTIL.getTimeS(item.dt)}}</span>
      </div>
    </div>
</template>

<script>
import {mapMutations, mapActions} from 'vuex'
export default {
  name: 'MusicList',
  data() {
    return {
      musicList: [],
    }
  },
  mounted() {
    this.getAllSongById();
  },
  methods: {
    // 获取歌单中的所有歌曲
    async getAllSongById() {
      const {params} = this.$route;
      let result = await this.$API.reqGetAllSongById(params);
      if (result.code === 200) {
        this.musicList = result.songs;
      }
    },
    ...mapMutations(['ADDMUSIC']),
    ...mapActions(['addMusic']),
    // 播放音乐
    playMusic(music) {
      this.addMusic(music)
    }
  },
}
</script>

<style scoped>
.song-table {
  width: 100%;
  background-color: #ffffff;
  font-size: .24rem;
}
.dark-bgcolor {
  background-color: #f9f9f9;
}
.song-head, .song-item {
 display: flex;
 justify-content: space-around;
 padding: .12rem;
}
.song-item:hover {
  background-color: #f0f1f2;
}
.sequence {
  width: 12.5%;
  text-align: center !important;
}
.love-icon {
  margin: 0 .1rem 0 .16rem;
  fill: #ccc;
}
.music-title {
  width: 37.5%;
}
.singer {
  width: 16%;
}
.album {
  width: 16%;
}
.duration {
  width: 8%;
}
.song-head span, .song-item span {
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>