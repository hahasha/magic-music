<template>
  <div class="recommend">
    <scroll ref="scroll" :data="scrollList" class="recommend-content">
      <div>
        <div class="slider-wrapper" v-if="banners.length">
          <slider>
            <div v-for="(item, index) in banners" :key="index">
              <a :href="item.url">
                <img :src="item.imageUrl" alt="" @load="loadImg">
              </a>
            </div>
          </slider>
        </div>
        <div class="disc-list">
          <h2 class="list-title">推荐歌单</h2>
          <ul class="list-wrap">
            <li class="disc-item" v-for="item in discList" :key="item.id">
              <div class="img-wrap">
                <img class="disc-img" width="123" height="123" v-lazy="item.picUrl" alt="">
                <span class="play-count">{{item.playCount | formatPlayCount}}</span>
              </div>
              <p class="name">{{item.name}}</p>
            </li>
          </ul>
        </div>
        <div class="new-song-list">
          <h2 class="list-title">最新音乐</h2>
          <ul>
            <li class="song-wrap" v-for="item in newSongList" :key="item.id">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.picUrl" alt="">
              </div>
              <div class="song-info">
                <span class="name">{{item.name}}</span>
                <span class="artists"> - {{item.artists}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <div class="loading-container" v-show="!discList.length && !newSongList.length">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import { getBanner, getDisc, getNewSong } from 'api/api'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
const ERR_OK = 200
const LIMIT_COUNT = 6

export default {
  data () {
    return {
      banners: [],
      discList: [], // 推荐歌单
      newSongList: [] // 推荐新歌
    }
  },
  computed: {
    scrollList () {
      return this.discList.concat(this.newSongList)
    }
  },
  created () {
    this.getBanner()
    this.getDisc()
    this.getNewSong()
  },
  filters: {
    formatPlayCount (value) {
      if (!value) return ''
      return (value / 10000).toFixed(1) + '万'
    }
  },
  methods: {
    getBanner () {
      getBanner().then(res => {
        if (res.code === ERR_OK) {
          this.banners = res.banners
        }
      })
    },
    getDisc () {
      getDisc({
        limit: LIMIT_COUNT
      }).then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.result
        }
      })
    },
    getNewSong () {
      getNewSong().then(res => {
        if (res.code === ERR_OK) {
          res.result.forEach(item => {
            const artists = []
            item.song.artists.forEach(artist => {
              artists.push(artist.name)
            })
            item.artists = artists.join('/')
            this.newSongList.push(item)
          })
        }
      })
    },
    loadImg () {
      if (!this.firstLoaded) { // 保证执行一次
        this.$refs.scroll.refresh()
        this.firstLoaded = true
      }
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .list-title
        font-size: $font-size-medium
        color: $color-theme
        margin 20px 0
        padding 4px 10px
        border-left 4px solid #d93f30
      .disc-list
        .list-wrap
          display flex
          flex-wrap wrap
          justify-content space-between
          .disc-item
            flex-basis 32.8%
            display inline-block
            font-size: $font-size-small
            margin-bottom 16px
            .img-wrap
              position relative
              .disc-img
                width 100%
              .play-count
                position absolute
                top 2px
                right 5px
                z-index 99
                font-family MicroSoft YaHei
                background-size 11px 10px
                background-position 0
                padding-left 13px
                background url('~common/image/play-count.svg') no-repeat
            .name
              font-family MicroSoft YaHei
              line-height 1.2
              padding 4px 6px 0 6px
              display: -webkit-box
              -webkit-line-clamp: 2
              -webkit-box-orient: vertical
              overflow: hidden
      .new-song-list
        .song-wrap
          display flex
          margin-bottom 10px
          align-items center
          padding-left 10px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .song-info
            font-size $font-size-medium
            .artists
              font-size $font-size-small
              color #999
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
