import { get } from './http'

// 获取banner（轮播图）
export const getBanner = params => get('/banner', params)
// 获取推荐歌单
export const getDisc = params => get('/personalized', params)
// 获取最新音乐
export const getNewSong = params => get('/personalized/newsong', params)
