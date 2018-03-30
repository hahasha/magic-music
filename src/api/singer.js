import jsonp from 'common/js/jsonp'
import {commonParam, options} from "./config"

export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParam, {
    channel: 'singer',
    pagesize: 100,
    pagenum: 1,
    page: 'list',
    key: 'all_all_all',
    g_tk: 2093184564,
    uin: 0,
    platform: 'yqq',
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParam, {
    g_tk: 1833224556,
    notice: 0,
    platform: 'h5page',
    needNewCode: 1,
    order: 'listen',
    from: 'h5',
    num: 15,
    begin: 0,
    singerid: singerId
  })
  return jsonp(url, data, options)
}
