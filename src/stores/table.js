import { defineStore, acceptHMRUpdate } from 'pinia'

export const useTableStore = defineStore('table', {
  state: () => ({
    fullscreenLoading: false
  })
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTableStore, import.meta.hot))
}
