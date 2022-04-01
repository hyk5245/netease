import Vue from "vue"
import Vuex from 'vuex'
import {reqGetMusicUrl, reqGetMusicLiric} from '@/api'

Vue.use(Vuex);

const state = {
    audioInfo: []
}
const actions = {
  async addMusic(context, music) {
    const {audioInfo} = context.state;
    let preMusciUrl = audioInfo.length > 0 ? audioInfo[audioInfo.length - 1].url : '';
    const musicInfo = {};
    musicInfo.name = music.name;
    musicInfo.artist = music.ar[0].name;
    musicInfo.cover = music.al.picUrl;
    let result = await reqGetMusicUrl({id: music.id})
    if (result.code === 200) musicInfo.url = result.data[0].url
    // 如果连续双击同一首歌曲，则不重新播放
    if (preMusciUrl === musicInfo.url) return ;
    let liricResult = await reqGetMusicLiric({id: music.id})
    if (liricResult.code === 200) musicInfo.lrc = liricResult.lrc.lyric
    // 想vuex中的audioInfo添加歌曲信息
    context.commit('ADDMUSIC', musicInfo)
  }
}

const mutations = {
  ADDMUSIC(state, musicObj) {
    // 在这里弄了一段时间，为什么不能直接添加一个对象，而是需要将其展开
    let musicIndex = -1;
    state.audioInfo.forEach((item, index) => {
      if (item.url === musicObj.url && musicObj.url !== null) {
        musicIndex = index;
      }
    })
    console.log('musicIndex', musicIndex);
    if (musicIndex !== -1) {
      state.audioInfo.splice(musicIndex, 1);
      state.audioInfo.push({
        name: musicObj.name,
        artist: musicObj.artist,
        url: musicObj.url,
        cover: musicObj.cover,
        lrc: musicObj.lrc
      });
    } else {
      state.audioInfo = [...state.audioInfo, {
        name: musicObj.name,
        artist: musicObj.artist,
        url: musicObj.url,
        cover: musicObj.cover,
        lrc: musicObj.lrc
      }]
    }
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})