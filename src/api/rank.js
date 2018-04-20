import jsonp from 'common/js/jsonp'
import {commonParam, options} from "./config"
import axios from "axios/index"

export function getTopList() {
  const url = 'api/getTopList'
  const data = Object.assign({}, commonParam, {
    g_tk: 1833224556,
    format: 'json',
    notice: 0,
    platform: 'h5',
    needNewCode: 1
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}


export function getMusicList(topid) {
  const url = 'api/getMusicList'
  const data = Object.assign({}, commonParam, {
    tpl: 3,
    page: 'detail',
    date:'2018-04-17',
    topid: topid,
    type: 'top',
    song_begin: 0,
    song_num: 30,
    g_tk: 2093184564,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
