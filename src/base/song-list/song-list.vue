<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song,index)" v-for="(song , index) in songs" class="item">
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
   props:{
       songs:{
           type:Array,
            default:[]
       }
   },
    methods:{
       getDesc(song){
           return `${song.singer}/${song.album}`
       },
      selectItem(item,index){ // 告诉父组件 被点击的歌曲 以及当前的索引  父组件是musicList
           this.$emit('select',item,index)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"


  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
</style>
