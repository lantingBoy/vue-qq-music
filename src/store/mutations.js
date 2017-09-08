/**
 * Created by Administrator on 2017/9/6.
 */
import * as types from './mutatin-types'
// 定义对数据修改的动作
const mutations ={
  [types.SET_SINGER](state,singer){
    state.singer=singer // 将更改的数据设置为 state里的数据
  },
  [types.SET_PLAYING_STATE](state,flag){
    state.playing=flag
  },
  [types.SET_FULL_SCREEN](state,flag){
    state.fullScreen=flag
  },
  [types.SET_PLAYLIST](state,list){
    state.playList=list
  },
  [types.SET_SEQUENCE_LIST](state,list){
    state.sequenceList=list
  },
  [types.SET_PLAY_MODE](state,mode){
    state.mode=mode
  },
  [types.SET_CURRENT_INDEX](state,index){
    state.currentIndex=index
  }
}
export default  mutations
