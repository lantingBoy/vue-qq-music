
// 从 存入歌手数据 返回singer
export const singer=state=> state.singer;
//c存入播放状态
export const playing=state=>state.playing;
//存入小播放器还是 全屏播放
export const fullScreen=state=>state.fullScreen;
//存入 播放列表
export const playList=state=>state.playList;
//存入有序列表
export const sequenceList=state=>state.sequenceList;
//存入什么播放模式
export const mode=state=>state.mode;
//存入当前播放歌曲索引
export const currentIndex=state=>state.currentIndex;

// 存入当前点击列表将要播放的歌曲
export const currentSong =(state)=>{
  return state.playList[state.currentIndex] || {}
}
