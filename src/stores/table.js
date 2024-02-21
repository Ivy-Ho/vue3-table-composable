import { defineStore, acceptHMRUpdate } from 'pinia'

export const useTableStore = defineStore('table', {
  state: () => ({
    fullscreenLoading: false
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTableStore, import.meta.hot))
}
