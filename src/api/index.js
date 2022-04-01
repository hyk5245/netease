import request from "./my_axios";
// 获取网友精选歌单
export const reqGetSongListByNetFriend = (params) => request.get(`/top/playlist?limit=${params.limit}&offset=${params.offset}`)
// 获取歌单详情
export const reqGetSongListDetailById = (p) => request.get(`/playlist/detail?id=${p.id}`)
// 获取歌单里的所有歌曲
export const reqGetAllSongById = (p) => request.get(`/playlist/track/all?id=${p.id}`)
// 获取歌单评论
export const reqGetSongListComment = (p) => request.get(`/comment/playlist?id=${p.id}&limit=${p.limit}&offset=${p.offset}`)
// 获取歌单收藏者
export const reqGetSongListSubscribers = (p) => request(`/playlist/subscribers?id=${p.id}&limit=${p.limit}&offset=${p.offset}`)
// 获取排行榜数据
export const reqGetRankList = () => request('/toplist')
// 获取歌手信息
export const reqGetSingerList = (p) => request(`/artist/list?limit=${p.limit}&offset=${p.offset}&initial=${p.initial}&type=${p.type}&area=${p.area}`)
// 获取音乐url
export const reqGetMusicUrl = (p) => request(`/song/url?id=${p.id}`)
// 获取音乐歌词
export const reqGetMusicLiric = (p) => request(`/lyric?id=${p.id}`)
// 获取推荐新音乐
export const reqGetNewSong = (p) => request(`/personalized/newsong?limit=${p.limit}`);

// 获取推荐页面的独家推送数据
export const reqGetPersonalPush = () => request('/personalized/privatecontent')
// 获取独家推送路由组件中的数据
export const reqGetPersonalPushList = (p) => request(`/personalized/privatecontent/list?limit=${p.limit}&offset=${p.limit}`)
// 获取mv地址
export const reqGetMvUrl = (p) => request(`/mv/url?id=${p.id}`)
// 获取mv数据（描述、作者等）
export const reqGetMvDetail = (p) => request(`/mv/detail?mvid=${p.id}`)
// 获取mv点赞、转发、评论数据
export const reqGetMvInfo = (p) => request(`/mv/detail/info?mvid=${p.id}`)
// 获取mv评论
export const reqGetMvComment = (p) => request(`/comment/mv?id=${p.id}&limit=${p.limit}&offset=${p.offset}`)