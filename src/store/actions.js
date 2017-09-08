/**
 * Created by Administrator on 2017/9/6.
 */
// 异步操作 和对 mutations的封装
import * as types from './mutatin-types'
export const selectPlay =function ({commit,state},{list,index}) {
  commit(types.SET_SEQUENCE_LIST,list)
  commit (types.SET_PLAYLIST,list)
  commit (types.SET_CURRENT_INDEX,index)
  commit (types.SET_FULL_SCREEN,true)
  commit (types.SET_PLAYING_STATE,true)

}
