<template>
  <div class="singer">
    <scroll ref="scroll" class="singer-content" :data="singers">
      <div >
        <ul>
          <li class="singer-item" v-for="item in singers" @click="selecItem(item)">
            <div  class="pic">
              <img v-lazy="`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`" width="60" height="60">
            </div>
            <div class="singer-name">
              {{item.Fsinger_name}}
            </div>
          </li>
        </ul>
      </div>
      <div class="loading-container" v-show="!singers.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import loading from 'base/loading/loading'//加载loading
  import {getSingerList} from 'api/singer' //获取数据
  import {ERR_OK} from  'api/config'
  import Scroll from 'base/scroll/scroll' //滚动
  import {mapMutations} from 'vuex'

  export default{
      data(){
          return {
              singers:[]
          }
      },
      created(){
          setTimeout(()=>{
            this._getSingerList()
          },500)
      },
      methods:{
        _getSingerList(){
          getSingerList().then((res)=>{
            if(res.code===ERR_OK){
              this.singers=res.data.list
            console.log(this.singers);

            }
          })
        },
        //派发点击事件
        selecItem(singer){  //singer 是 item 是遍历中的数据
          this.$router.push({
            path:`/singer/${singer.Fsinger_id}`  //歌手对应的id
          })
          this.setSinger(singer) //调用这个设置实现对mutations的提交
          //相当于调用了this.store.commit()
        },
        //更改数据
        ...mapMutations({
          setSinger:'SET_SINGER' //将更改数据映射到 mutations-types.js 中设置的常量 'SET_SINGER'
        })
      },
      components:{
          Scroll,
          loading
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position :fixed
    top: 88px
    bottom:0
    width :100%
    .singer-content
      height:100%
      overflow hidden
      .singer-item
        display :flex;
        align-items :center;
        padding:0 20px 20px 20px
        text-align :center
        .singer-name
          color:gray;
        .pic
          flex: 0 0 80px
          width: 60px
          padding-right: 20px
          img
            border-radius:999px;
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)

</style>
