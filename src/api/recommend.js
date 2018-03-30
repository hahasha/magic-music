import jsonp from 'common/js/jsonp'
import {commonParam, options} from "./config"
import axios from 'axios'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParam, {
    g_tk: 1833224556,
    uin: 0,
    platform: 'h5',
    needNewCode:1
  })
  return jsonp(url, data, options)
}
//ajax 请求
export function getDiscList() {
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParam, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}


