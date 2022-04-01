import Vue from 'vue'
import VueRouter from 'vue-router'
import DiscoverMusic from '@/pages/DiscoverMusic'
import Friend from '@/pages/Friend'
import Recommend from '@/pages/DiscoverMusic/Recommend'
import Rank from '@/pages/DiscoverMusic/Rank'
import NewMusic from '@/pages/DiscoverMusic/NewMusic'
import Singer from '@/pages/DiscoverMusic/Singer'
import SongList from '@/pages/DiscoverMusic/SongList'
import SongListDetail from '@/pages/SongListDetail'
import MusicList from '@/pages/SongListDetail/MusicList'
import Comment from '@/pages/SongListDetail/Comment'
import Collect from '@/pages/SongListDetail/Collect'
import VideoShow from '@/pages/VideoShow'
import PersonalPush from '@/pages/PersonalPush'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/discover',
      component: DiscoverMusic,
      redirect: '/discover/recommend',
      children: [
        {
          path: '/discover/recommend',
          component: Recommend,
        },
        {
          path: '/discover/rank',
          component: Rank
        },
        {
          path: '/discover/newmusic',
          component: NewMusic
        },
        {
          path: '/discover/singer',
          component: Singer
        },
        {
          path: '/discover/songlist',
          component: SongList
        },
      ]
    },
    {
      path: '/friend',
      component: Friend
    },
    {
      path: '/',
      redirect: '/discover'
    },
    {
      path: '/songlist/detail/:id',
      component: SongListDetail,
      // 目标组件会收到发起跳转处的数据(发起跳转是有数据的话)
      redirect: '/songlist/detail/music/:id', // 这里不加参数会栈溢出
      children: [
        {
          path: '/songlist/detail/music/:id',
          component: MusicList
        },
        {
          path: '/songlist/detail/comment/:id',
          component: Comment
        },
        {
          path: '/songlist/detail/collect/:id',
          component: Collect
        }
      ]
    },
    {
      path: '/video/:id',
      component: VideoShow
    },
    {
      path: '/push',
      component: PersonalPush
    }
  ]
})