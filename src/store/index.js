import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info: {},
    selectFilter: [],
    total: 0
  },
  mutations: {
    initInfo (state, payload) {
      let total = 0
      for (const landscape of payload.landscape) {
        for (const subcategorie of landscape.subcategories) {
          total += subcategorie.items.length
        }
      }
      state.total = total
      state.info = payload
    },
    addFilter (state, payload) {
      let filters = state.selectFilter
      let isExsit = false
      for (let i = 0; i < filters.length; i++) {
        if (filters[i].key == payload.key) {
          if (payload.options.length == 0) {
            state.selectFilter.splice(i, 1)
            isExsit = true
            break
          } else {
            state.selectFilter[i].options = payload.options
            isExsit = true
          }
        }
      }

      if (!isExsit) {
        state.selectFilter.push(payload)
      }

    },
    resetFilters (state) {
      state.selectFilter = []
    },
    useTag (state, payload) {
      state.selectFilter = payload.filters
    }
  }
})
