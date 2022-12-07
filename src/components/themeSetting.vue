<script setup lang="ts">
const show = ref(false) // 是否展示设置
const animates = [
  { value: 'zoom-fade', label: '渐变' },
  { value: 'zoom-out', label: '闪现' },
  { value: 'fade-slide', label: '滑动' },
  { value: 'fade', label: '消退' },
  { value: 'fade-bottom', label: '底部消退' },
  { value: 'fade-scale', label: '缩放消退' },
]

const { designSettingLocalStorage, animationLocalStorage } = useDesignSettingStore()

const appThemeList: string[] = [
  '#2d8cf0',
  '#0960bd',
  '#0084f4',
  '#009688',
  '#536dfe',
  '#ff5c93',
  '#ee4f12',
  '#0096c7',
  '#9c27b0',
  '#ff9800',
  '#FF3D68',
  '#00C1D4',
  '#71EFA3',
  '#78DEC7',
  '#1768AC',
  '#FB9300',
  '#FC5404',

]
const themeText = computed(() => {
  return !isDark ? '浅色主题' : '深色主题'
})
const handleChange = () => {
  toggleDark()
}
</script>

<template>
  <div fixed top="50%" rounded flex items-center right="0">
    <n-button tertiary type="primary" @click="(show = true)">
      <i i-carbon-settings />
    </n-button>
  </div>
  <n-drawer v-model:show="show" :width="300">
    <n-drawer-content title="项目设置" closable>
      <div text="center">
        <n-divider title-placement="center">
          主题
        </n-divider>

        <n-popover placement="bottom" trigger="hover">
          <template #trigger>
            <n-switch :value="isDark" class="dark-switch" @update:value="handleChange">
              <template #checked>
                <n-icon text="#ffd93b">
                  <svg
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512" data-v-bd099a11=""
                  >
                    <path d="M234 26h44v92h-44z" fill="currentColor" />
                    <path d="M234 394h44v92h-44z" fill="currentColor" />
                    <path d="M338.025 142.857l65.054-65.054l31.113 31.113l-65.054 65.054z" fill="currentColor" />
                    <path d="M77.815 403.074l65.054-65.054l31.113 31.113l-65.054 65.054z" fill="currentColor" />
                    <path d="M394 234h92v44h-92z" fill="currentColor" />
                    <path d="M26 234h92v44H26z" fill="currentColor" />
                    <path d="M338.029 369.14l31.112-31.113l65.054 65.054l-31.112 31.112z" fill="currentColor" />
                    <path d="M77.802 108.92l31.113-31.113l65.054 65.054l-31.113 31.112z" fill="currentColor" />
                    <path d="M256 358a102 102 0 1 1 102-102a102.12 102.12 0 0 1-102 102z" fill="currentColor" />
                  </svg>
                </n-icon>
              </template>
              <template #unchecked>
                <n-icon text="#ffd93b">
                  <svg
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512" data-v-bd099a11=""
                  >
                    <path
                      d="M264 480A232 232 0 0 1 32 248c0-94 54-178.28 137.61-214.67a16 16 0 0 1 21.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200c31.34 0 59.57-5.07 81.61-14.67a16 16 0 0 1 21.06 21.06C442.28 426 358 480 264 480z"
                      fill="currentColor"
                    />
                  </svg>
                </n-icon>
              </template>
            </n-switch>
          </template>
          <span>{{ themeText }}</span>
        </n-popover>
        <n-divider title-placement="center">
          系统主题
        </n-divider>
        <n-color-picker
          v-model:value="designSettingLocalStorage.themeColor" :modes="['hex']"
          :swatches="appThemeList"
        />
        <n-divider title-placement="center">
          动画
        </n-divider>
        <div flex items-center justify-between mb5>
          <div>切换动画</div>
          <n-switch v-model:value="animationLocalStorage.isAnimation" />
        </div>
        <div flex items-center justify-between>
          <div>动画类型</div>
          <n-select
            v-model:value="animationLocalStorage.animation" w40 :consistent-menu-width="false"
            :options="animates"
          />
        </div>
      </div>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
:deep(.dark-switch .n-switch__rail) {
  background-color: #000e1c;
}
</style>
