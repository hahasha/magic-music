<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImg" :songs="songs"></music-list>
  </transition>
</template>

<script>
  import musicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getMusicList} from "api/rank"
  import {ERR_OK} from "api/config"
  import {createSong} from "common/js/song"
  import {getVkey} from "api/vkey";

  export default {
    computed: {
      title() {
        return this.topList.TopTitle
      },
      bgImg() {
        if (this.songs.length) {
          return this.songs[0].image
        }
        return ''
      },
      ...mapGetters([
        'topList',
        'vkey'
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created(){
      this._getMusicList()
    },
    methods: {
      _getMusicList(){
        getMusicList(this.topList.id).then((res)=>{
          if(res.code === ERR_OK){
            this.songs = this._normalizeSongs(res.songlist)
          }
        })
      },
      _normalizeSongs(list){
        let ret = []
        list.forEach((item)=>{
          const musicData = item.data
          if(musicData.songid&&musicData.albumid){
            getVkey(musicData.songmid).then((res)=>{
              if(res.code === ERR_OK){
                musicData.vkey = res.data.items[0].vkey
              }
            })
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components: {
      musicList
    }
  }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
