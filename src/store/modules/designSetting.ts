import { acceptHMRUpdate, defineStore } from 'pinia'

export const useDesignSettingStore = defineStore('designSetting', () => {
  const designSettingLocalStorage = useStorage('designSetting', {
    theme: 'dark',
    themeColor: '#2d8cf0',
  })

  function setDesign(themeColor: string) {
    designSettingLocalStorage.value.themeColor = themeColor
  }

  return {
    designSettingLocalStorage,
    setDesign,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
