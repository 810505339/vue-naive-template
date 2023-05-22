import { defineStore } from 'pinia'

const usePlayingList = defineStore('playingList', () => {
  // 正在播放列表
  const playingList = ref<any>([])
  return {
    playingList,
  }
}, {
  persist: true,
})
export default usePlayingList
