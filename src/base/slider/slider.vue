<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :class="{active: currentPageIndex === index}"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {addClass} from 'common/js/dom'
  import BScroll from 'better-scroll'

  export default {
    data(){
      return {
        dots : [],
        currentPageIndex : 0
      }
    },
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 1200
      }
    },
    mounted() {
      //保证dom渲染完毕，添加20ms延时（浏览器17ms刷新一次）
      setTimeout(()=>{
        this._setSliderWidth()
        this._initDots()
        this._initSlider()
        if(this.autoPlay){
          this._play()
        }
        window.addEventListener('resize',()=>{
          if(!this.slider){
            return
          }
          this._setSliderWidth(true)
          this.slider.refresh()
        })
      },20)
    },
    methods: {
      _setSliderWidth(isResize) {
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth

        this.children = this.$refs.sliderGroup.children
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')
          child.style.width = sliderWidth + 'px'
          width += sliderWidth
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initDots(){
        this.dots = new Array(this.children.length)
      },
      _initSlider() {
        // 实例化scroll
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,   //关闭或者打开惯性运动的执行
          snap: true,       //隔断（翻页）
          snapLoop: this.loop,   //无限滚动
          snapThreshold: 0,
          snapSpeed: 400,   //滑动的时间
        })
        // 监听滚动结束时间获取pageX
        this.slider.on('scrollEnd',()=>{
          let pageIndex = this.slider.getCurrentPage().pageX
          if(this.loop){
            pageIndex -=1 // 由于better-scroll循环播放首尾各加一个,因此索引-1
          }
          this.currentPageIndex = pageIndex

          if(this.autoPlay){
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
      _play(){
        let pageIndex = this.currentPageIndex + 1
        if(this.loop){
          pageIndex +=1
        }
        this.timer = setTimeout(()=>{
          this.slider.goToPage(pageIndex , 0 , 1200)//0表示y轴方向的索引
        },this.interval)
      }
    },
    //优化：在组件销毁时清除计时器(有利于内存的释放)
    destroyed(){
      clearTimeout(this.timer)
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
