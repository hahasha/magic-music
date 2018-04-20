import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {commonParam} from "./config";

export function getLyric(mid) {
  const url = '/api/getLyric'

  const data = Object.assign({}, commonParam, {
    pcachetime: +new Date(),
    songmid: mid,
    g_tk: 2093184564,
    hostUin: 0,
    format: 'json',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}


export function getSongList(disstid) {
  const url = '/api/getSongList'

  const data = Object.assign({}, commonParam, {
    g_tk: '1833224556',
    format: 'json',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    new_format: 1,
    pic: 500,
    disstid: disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    picmid: 1,
    nosign: 1,
    song_begin: 0,
    // song_num: 15
  })

  //发送请求
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

