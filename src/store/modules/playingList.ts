import { defineStore } from 'pinia'
import { instance } from '~/api'

export enum PlayModel {
  shuffle, // 随机
  circulate, // 循环
  loop, // 单曲循环
}

const usePlayingList = defineStore('playingList', () => {
  // 正在播放列表
  const playingList = ref<Array<any>>([])
  // 正在播放的index
  const selectIndex = ref<string | number>('')
  // 获取歌曲 因为歌曲链接会过期

  // ?id=2026224214&level=exhigh
  const { execute, data } = useAxios('/song/url/v1', instance, { immediate: false })

  const selectItem = computed(() => {
    return playingList.value[selectIndex.value as number]
  })

  // 播放模式
  const playmodel = ref(PlayModel.circulate)

  // 播放歌曲
  async function playSong(play: any) {
    await execute({
      params: {
        id: play.id,
        level: 'standard',
      },
    })

    play.url = data.value?.data?.[0].url
    const index = playingList.value.findIndex((p: any) => p.id === play.id)
    // 没找到
    if (!~index) {
      const len = playingList.value.push(play)
      selectIndex.value = len - 1
    }
    else {
      playingList.value[index] = play
      selectIndex.value = index
    }
    // 找到了设置正在播放的id
  }
  // 清空播放列表
  function clear() {
    playingList.value = []
    console.log('清除播放')

    selectIndex.value = 0
  }
  // 上一曲
  function previous() {
    // 随机播放模式
    if (playmodel.value === PlayModel.shuffle) {
      shufflePlay()
      return
    }

    // 正常模式
    if (selectIndex.value === 0) {
      // 最后一首歌
      selectIndex.value = playingList.value.length - 1
      return
    }
    (selectIndex.value as number) -= 1
  }

  // 下一曲
  function next() {
    // 随机播放模式
    if (playmodel.value === PlayModel.shuffle) {
      shufflePlay()
      return
    }
    // 正常模式
    if (selectIndex.value === playingList.value.length - 1) {
      // 最后一首歌
      selectIndex.value = 0
      return
    }
    (selectIndex.value as number) += 1
  }

  // 随机播放
  function shufflePlay() {
    // 切换的时候如果是随机模式

    const tempList = playingList.value.filter((_, index) => index !== selectIndex.value)
    // 选中歌曲 然后设置播放它
    const findItem = tempList[Math.floor(Math.random() * tempList.length)]
    console.log(tempList)
    playSong(findItem)
  }

  return {
    playingList,
    playSong,
    clear,
    previous,
    next,
    playmodel,
    selectIndex,
    selectItem,
  }
}, {
  persist: true,
})
export default usePlayingList
