<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>


<script>
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSongList} from "api/song"
  import {ERR_OK} from "api/config";
  import {createSong} from "common/js/song";
  import Song from 'common/js/song'

  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
      title() {
        return this.disc.dissname
      },
      bgImage() {
        return this.disc.imgurl
      },
      ...mapGetters([
        'disc'
      ])
    },
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSong(res.cdlist[0].songlist)
            // this.songs = res.cdlist[0].songlist
          }
        })
      },
      _normalizeSong(list) {
        let ret = []
        // list.forEach((item)=>{
        //   if(item.songid){
        //     ret.push(createSong(list))
        //   }
        // })
        list.forEach((items) => {
          ret.push(new Song({
            id: items.id,
            mid: items.mid,
            name: items.name,
            album: items.album.name,
            singer: this._filterSinger(items.singer),
            duration:items.interval,
            image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${items.album.mid}.jpg?max_age=2592000`,
            // https://y.gtimg.cn/music/photo_new/T002R300x300M000 003bSL0v4bpKAx.jpg?max_age=2592000
            // url:`http://dl.stream.qqmusic.qq.com/C400${items.mid}.m4a?guid=6399709480&vkey=71DCC11CB3376E6BAE2D8E564FF5FD4174B19FAC70711B0535AAB24308B88AC1CA76EEFBD4C26B6FC82472F3CC8B81EBE3946786CA3A8085&uin=0&fromtag=38`
            url:`http://dl.stream.qqmusic.qq.com/C100${items.mid}.m4a?vkey=0AF6573DAAD8578968A21845CB1CD05B3C395BF0E2F77C81E43C6812A314A95F0BD50FC76390A7D5AA56DAFFAC26985F55A7EB48CC745C70&guid=6399709480&uin=1007892941&fromtag=66`
            //   this.id = id
            // this.mid = mid
            // this.singer = singer
            // this.name = name
            // this.album = album
            // this.duration = duration
            // this.image = image
            // this.url = url
          }))
        })
        return ret
      },
      _filterSinger(singer) {
        let ret = []
        if (!singer) {
          return ''
        }
        singer.forEach((s) => {
          ret.push(s.name)
        })
        return ret.join('/')
      }
    }
    ,
    components: {
      MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
