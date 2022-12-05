<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
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

const getThemeOverrides = computed(() => {
  return {
    common: {
      primaryColor: '#9c27b0',
      primaryColorHover: '#9c27b0',
      primaryColorPressed: '#9c27b0',
      primaryColorSuppl: '#9c27b0',
    },
    LoadingBar: {
      colorLoading: '#9c27b0',
    },
  }
})
</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN" :theme="darkTheme" :theme-overrides="getThemeOverrides">
    <RouterView />
  </NConfigProvider>
</template>

<style>

</style>
