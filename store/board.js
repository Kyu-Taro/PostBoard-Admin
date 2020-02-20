const state = {
  id: null
}

const mutations = {
  setId(state, id) {
    state.id = id;
  }
}

const getters = {
  id: state => state.id
}

const actions = {
  setId({ commit }, id) {
    commit('setId', id);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
