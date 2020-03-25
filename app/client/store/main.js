import axios from 'axios';

export default {
  namespaced: true,
  state: {
    someValue: 0
  },
  mutations: {
    UPDATE_MAIN_CONTENT: (state, { someValue }) => {
      console.log("UPDATE_MAIN_CONTENT", someValue)
      state.someValue = someValue;
    },
  },
  actions: {
    async update_main_content({ commit }, v) {
        let c = {someValue: v};
        commit('UPDATE_MAIN_CONTENT', c)
    },
  },
};
