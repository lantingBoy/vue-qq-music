<template>

  <div class="player" v-show="playList.length>0">
    <transition name="normal"
          v-on:enter="enter"
          v-on:after-enter="afterEnter"
          v-on:leave="leave"
          v-on:after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l" >
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdClass">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric"></div>
            </div>
          </div>

        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" ></span>
            <span class="dot" ></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{getTime(currentTime)}}</span>

            <span class="time time-r"></span>
          </div>
          <!--进度条-->
          <div class="operators">
            <div class="icon i-left" >
              <i class="icon-mode"></i>
            </div>
            <div class="icon i-left" :class="disableCls">
              <i  class="icon-prev" @click="prev"></i>
            </div>
            <div class="icon i-center" :class="disableCls">
              <i  :class="playIcon" @click="togglePlaying"></i>
            </div>
            <div class="icon i-right" :class="disableCls">
              <i @click="next" class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <img  width="40" height="40" :src="currentSong.image" :class="cdClass">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <i :class="miniIcon" @click.stop="togglePlaying"></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="audio" @canplay="ready()" @error="error" @timeupdate="updateTime"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapMutations} from 'vuex'
  import animations from 'create-keyframe-animation' // 引入做动画的第三方库
  import{prefixStyle} from 'common/js/dom'
  const transform =prefixStyle('transform')
  export default{
    data(){
      return {
        songReady:false,
        currentTime:0
      }
    },
    computed:{
        cdClass(){
            return this.playing?'play':'pause'   //通过v-bind class 在计算属性中计算当前播放按钮的旋转
        },
        playIcon(){
          return this.playing?'icon-pause':'icon-play'  //通过v-bind class 在计算属性中计算当前播放按钮的样式
        },
        miniIcon(){
          return this.playing?'icon-pause-mini':'icon-play-mini' //通过v-bind class 在计算属性中计算当前播放按钮的样式
        },
        disableCls(){
          return this.songReady?'':'disable'
        },
      ...mapGetters([
        'fullScreen',
        'playList',
        'currentSong', //取到当前的播放歌曲
        'playing' , //取到播放状态
        'currentIndex'
      ])
    },
    methods:{
      back(){
        this.set(false) // set是一个方法   所以要用传参的方式进行设置 false or true
      },
      open(){
        this.set(true)  //小播放器点击
      },
      prev(){
        if(!this.songReady){
            console.log(1)
          return
        }
        let index=this.currentIndex-1;
        if(index===-1){
            index=this.playList.length-1
        }
        this.setCurrentIndex(index)
        if(!this.playing){
          this.togglePlaying()
        }
        this.songReady=false
      },
      next(){
        if(!this.songReady){
          return
        }
        let index=this.currentIndex+1;
        if(index===this.playList.length){
          index=0
        }
        this.setCurrentIndex(index)
        if(!this.playing){
          this.togglePlaying()
        }
        this.songReady=false
      },
      ready(){
        this.songReady=true
      },
      error(){
        this.songReady=true
      },
      updateTime(e){
        this.currentTime=e.target.currentTime
      },
      getTime(interval){
        let minute=interval/60 | 0;
        let seconds=this.two(interval%60 | 0);
        return `${minute}:${seconds}`
      },
      two(num,n=2){
        let len=num.toString().length;
        while(len<2){
            num='0'+num
        }
        return num
      },
      ...mapMutations({  //组件中提交mutaions
        set:'SET_FULL_SCREEN', //取到 mutations中设置是否全屏的方法  然后给这个方法命名为set
        setPlaying:'SET_PLAYING_STATE' ,// 取到当前播放状态
        setCurrentIndex:'SET_CURRENT_INDEX' //取到当前的索引
      }),
      getElmentPositionAndScale:function(){
        const minLeft=40
        const minBottom=40
        const minImgWidth=40
        const maxPaddingTop=80
        const maxImgWidth=window.innerHeight*0.8
        const scale = minImgWidth/maxImgWidth
        const x=-(window.innerWidth/2-minLeft)
        const y=window.innerHeight-maxPaddingTop-maxImgWidth/2-minBottom
        return{
          x,
          y,
          scale
        }
      },
      // 此回调函数是可选项的设置
      // 与 CSS 结合时使用
      enter: function (el, done) {
        const {x,y,scale}=this.getElmentPositionAndScale();
        let animation={  // 定义动画的过程
          0:{
            transform:`translate3d(${x}px,${y}px,0) scale(${scale})`
          },
          60 :{
            transform:`translate3d(0,0,0) scale(1.1)`
          },
          100:{
            transform:`translate3d(0,0,0) scale(1)`
          }
        };
        // 注册动画
        animations.registerAnimation({
          name:'move', //动画的名称
          animation,   //动画的过程
          presets:{
            duration:500,  //动画的时间
            easing:'linear' //动画的运动曲线
          }
        });
        // 将这个运行的动画挂载到 指定的dom 节点上
        animations.runAnimation(this.$refs.cdWrapper,'move',done)
      },
      afterEnter: function (el) {
        animations.unregisterAnimation('move'); // 动画完成解除动画
        this.$refs.cdWrapper.style.animation="" //将这个dom节点的所有运动都清除掉
      },
      // 此回调函数是可选项的设置
      // 与 CSS 结合时使用
      leave: function (el, done) {
        this.$refs.cdWrapper.style.transition='all 0.4s';//设置cd 到mini播放器的动画
        const {x,y,scale}=this.getElmentPositionAndScale();
        this.$refs.cdWrapper.style[transform]=`translate3d(${x}px,${y}px,0) scale(${scale})`
        this.$refs.cdWrapper.addEventListener('transitionend',done)
      },
      afterLeave: function (el) {
        // ...
        this.$refs.cdWrapper.style.transition="";
        this.$refs.cdWrapper.style.transform=""
      },
      togglePlaying(){
        if(!this.songReady){
          return
        }
        this.setPlaying(!this.playing) // 对播放取反
      }
    },
    watch:{
        currentSong(){
          this.$nextTick(()=>{   // dom加载完成的函数
            this.$refs.audio.play() //需要等到dom 加载完成后才播放
          })
        },
        playing(newPlaying){  //监听playing
          const audio=this.$refs.audio
          this.$nextTick(()=>{
            newPlaying?audio.play():audio.pause()  // 有于audio标签 需要在dom 加载完成后才能调用 所以用$nextTick函数
          })
        }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
