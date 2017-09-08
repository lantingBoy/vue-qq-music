<template>
  <transition name="slide">
   <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>

</template>
<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from  'api/config'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'

  export default{
      data(){
          return {
            songs:[]
          }
      },
      //取数据
    computed:{
          title(){
              return this.singer.Fsinger_name
          },
          bgImage(){  //导出背景图片  此处是通过props传给子组件
              return `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.singer.Fsinger_mid}.jpg?max_age=2592000`
          },
      ...mapGetters([   //注意此处是一个数组
        'singer'  //此处的singer 就相当于getters.js里的singer
      ])

    },
    created(){
          setTimeout(()=>{
            this._getSingerDetail();
          },300)
    },
    methods:{
      _getSingerDetail(){
        if(!this.singer.Fsinger_mid){ //如果没有取到对应歌手的id
          this.$router.push('/singer'); //让他去歌手列表页
          return
        }
        getSingerDetail(this.singer.Fsinger_mid).then((res) => {
          if (res.code===ERR_OK){
            this.songs= this._normalizeSongs(res.data.list);//赋值请求数据
            console.log(this.songs)
          }
        })
      },
      //处理请求到的数据 这里把我们需要的数据 重新定义一个类封装在common/js/song.js 我在
      //data里重新return songs:[]   这里就是我们将定义的类赋值给songs:[]
      _normalizeSongs(list){
        let ret=[];
        list.forEach((item)=>{
          let {musicData}=item;
          if(musicData.songid && musicData.albumid){
              ret.push(createSong(musicData));
          }
        });
        return ret;
      }
    },
    components:{
        MusicList,

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet" >
  @import "~common/stylus/variable"
  .singer-detail
    position :fixed;
    z-index:100;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background :#222;
  .slide-enter-active,.slide-leave-active
    transition :all 0.4s
  .slide-enter,.slide-leave-to
    transform :translate3d(100%,0,0)
</style>
