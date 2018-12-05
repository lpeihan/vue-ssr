import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default () => {
  return new Vuex.Store({
    state: {
      msg: 'hello'
    },
    mutations: {
      'SET_MSG'(state, msg) {
        state.msg = msg;
      }
    },
    getters: {},
    actions: {
      async setMsg({ commit }, msg) {
        await commit('SET_MSG', msg);
      }
    }
  });
};
