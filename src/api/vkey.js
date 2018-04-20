import axios from 'axios'
import {commonParam} from "./config";

export function getVkey(mid){
  const url = '/api/getVkey'
  const data = Object.assign({},commonParam,{
    g_tk:2093184564,
    // jsonpCallback:'jsonpCallback',
    hostUin:0,
    platform:'yqq',
    needNewCode:0,
    cid:205361747,
    // callback:'jsonpCallback',
    songmid:mid,
    filename:`C400${mid}.m4a`,
    guid:6399709480
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
