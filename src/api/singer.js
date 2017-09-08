import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

//获取歌手列表数据
export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  });
  return jsonp(url, data, options)
}

//歌手详情数据

export function getSingerDetail(singerId) {
  const url="https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg";
  const data = Object.assign({}, commonParams, {
    notice:0,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    songstatus:1,
    begin:0,
    num:30,
    g_tk:1466487190,
    order:'listen',
    singermid:singerId
  });
  return jsonp(url, data, options)
}

