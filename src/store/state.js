/**
 * Created by Administrator on 2017/9/6.
 */
import {playMode} from 'common/js/config'
const state ={
  singer:{},
  playing:false, //是否播放
  fullScreen:false,//是否全屏显示
  playList:[],   //播放列表
  sequenceList:[],//有序列表
  mode:playMode.sequence,// 单曲 or 随机 or 列表 播放
  currentIndex:-1   //当前播放的歌曲
}

export default state
