/**
 * Created by Administrator on 2017/9/6.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from  './state'
import mutations from './mutations'

import createLogger from 'vuex/dist/logger' //vue自带的日志插件
Vue.use(Vuex);
//调试工具
//严格模式下，无论何时发生了状态变更且不是由mutation函数引起的，将会抛出错误，这能保证所有的状态变更都能被调试工具追踪
//严格模式
const debug = process.env.NODE_ENV !=='production'  //!== b表示严格不相等 还要比较数据类型

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict:debug,//开启严格模式
  plugins:debug?[createLogger()]:[]//vuex 的store 接受plugin选项，他暴露出每次mutation的钩子
})
