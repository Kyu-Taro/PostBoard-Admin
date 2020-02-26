const state = {
  id: null
}

const mutations = {
  setId(state, id) {
    state.id = id
  }
}

const actions = {
  setId({ commit }, id) {
    commit('setId', id);
  }
}

const getters = {
  id: state => state.id
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
