<script setup lang="ts">
import { darkTheme } from 'naive-ui'
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg

useHead({
  title: 'Vitesse',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
const themeSetting = useDesignSettingStore()

const getThemeOverrides = computed(() => {
  const appTheme = themeSetting.designSettingLocalStorage.themeColor
  const lightenStr = lighten(appTheme, 6)
  return {
    common: {
      primaryColor: appTheme,
      primaryColorHover: lightenStr,
      primaryColorPressed: lightenStr,
      primaryColorSuppl: appTheme,
    },
    LoadingBar: {
      colorLoading: appTheme,
    },
  }
})
const theme = computed(() => {
  return isDark.value ? darkTheme : null
})
</script>

<template>
  <NConfigProvider :theme-overrides="getThemeOverrides" :theme="theme">
    <n-message-provider>
      <RouterView />
    </n-message-provider>
  </NConfigProvider>
</template>

<style>

</style>
