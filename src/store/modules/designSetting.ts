import { defineStore } from 'pinia'

export const designSetting = defineStore('designSetting', () => {
  const designSettingLocalStorage = useStorage('designSetting', {
    theme: 'dark',
    themeColor: '#2d8cf0',
  })
  function setDesign(theme: string, themeColor: string) {
    designSettingLocalStorage.value.theme = theme
    designSettingLocalStorage.value.themeColor = themeColor
  }

  return {
    setDesign,
  }
})
