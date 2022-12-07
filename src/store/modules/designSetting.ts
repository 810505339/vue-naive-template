import { acceptHMRUpdate, defineStore } from 'pinia'

export const useDesignSettingStore = defineStore('designSetting', () => {
  const designSettingLocalStorage = useStorage('designSetting', {
    themeColor: '#2d8cf0', // 主题颜色
  })
  const animationLocalStorage = useStorage('animationLocalStorage', {
    isAnimation: true, // 是否使用动画
    animation: 'zoom-fade', // 动画效果
  })

  function setDesign(themeColor: string) {
    designSettingLocalStorage.value.themeColor = themeColor
  }

  function setAnimation(isAnimation: boolean, animation: string) {
    animationLocalStorage.value.isAnimation = isAnimation
    animationLocalStorage.value.animation = animation
  }

  return {
    animationLocalStorage,
    designSettingLocalStorage,
    setAnimation,
    setDesign,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
