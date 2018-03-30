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
}

//封装方法
export function createSong(musicData,id) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${id}.jpg?max_age=2592000`,
    // url: `dl.stream.qqmusic.qq.com/${musicData.songmid}.m4a?fromtag=66`
    url : `http://isure.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=32`
    // http://dl.stream.qqmusic.qq.com/C400003UTRfZ12wGOs.m4a?vkey=7394166A10D457F12DB9015F1FA63B17920E31C32C6D566065A2B17BB10F159ACE641C943134FDF346F2B80A6F57A198BF8B99D0374380A4&guid=6399709480&uin=1007892941&fromtag=66
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
