import { createStore } from "vuex";

export default createStore({
  state: {
    token: null,
    user: {
      ccoId: null,
      id: null,
      name: null,
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {},
  modules: {},
});
