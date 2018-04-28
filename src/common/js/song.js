import {getLyric} from 'api/song'
import {ERR_OK} from "api/config";
import {Base64} from 'js-base64'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
}


//封装方法
export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `http://isure.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=32`
    // url:`http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=6399709480&vkey=71DCC11CB3376E6BAE2D8E564FF5FD4174B19FAC70711B0535AAB24308B88AC1CA76EEFBD4C26B6FC82472F3CC8B81EBE3946786CA3A8085&uin=0&fromtag=38`
    url: `http://dl.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?vkey=${musicData.vkey}&uin=1007892941&guid=6399709480&fromtag=66`
  })}

export function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}


