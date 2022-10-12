import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from "js-cookie";

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  state: {
    user: undefined,
    $lang: '',
    $theme: {},
    $userinfo: {}
  },
  mutations: {
    SIGNIN(state, data) {
      state.user = data;

      Cookies.set('user', JSON.stringify(data), { expires: 7 });
    },
    SIGNOUT(state, data) {
      state.user = undefined;
      Cookies.remove('user');
    },
    SETUSER (state, data) {
      state.$userinfo = data;
    },
  },
  actions: {
    signin({ commit }, payload) {
      commit('SIGNIN', payload);
    },
    signout(context, payload) {
      context.commit('signout', payload);
    },
    setUserInfo({ commit }, data) {
      commit('SETUSER', data);
    },
    remUserInfo ({ commit }, data) {
      commit('SETUSER', null);
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
