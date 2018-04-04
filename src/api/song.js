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
