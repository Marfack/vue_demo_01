import { createStore } from 'vuex'

export default createStore({
  state: {
    currentSpotIndex: 0,
    currentViewIndex: 0
  },
  mutations: {
    changeCurrentSpot(state, cur) {
      state.currentSpotIndex = cur
    },
    changeCurrentView(state, cur) {
      state.currentViewIndex = cur
    }
  },
  actions: {
    asyncChangeCurrentSpot(context, cur) {
      context.commit('changeCurrentSpot', cur)
    },
    asyncChangeCurrentView(context, cur) {
      context.commit('changeCurrentView', cur)
    }
  },
  modules: {
  }
})
