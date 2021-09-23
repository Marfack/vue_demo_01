import { createStore } from 'vuex'

export default createStore({
  state: {
    currentSpotIndex: 0,
    currentViewIndex: 0,
    loading: true
  },
  mutations: {
    changeCurrentSpot(state, cur) {
      state.currentSpotIndex = cur
    },
    changeCurrentView(state, cur) {
      state.currentViewIndex = cur
    },
    setLoading(state, b) {
      state.loading = b
    }
  },
  actions: {
    asyncChangeCurrentSpot(context, cur) {
      context.commit('changeCurrentSpot', cur)
    },
    asyncChangeCurrentView(context, cur) {
      context.commit('changeCurrentView', cur)
    },
    asyncSetLoading(context, b) {
      context.commit('setLoading', b)
    }
  },
  modules: {
  }
})
