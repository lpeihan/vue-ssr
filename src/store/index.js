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
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(123);
          }, 1000);
        }).then((data) => {
          commit('SET_MSG', data);
        });
      }
    }
  });
};
