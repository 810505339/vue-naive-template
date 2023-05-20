<script setup lang="ts">
const navbar = [
  'Music',
  'Podcast',
  'Radio',
  'Live',
]
const selectNav = ref('Music')
function changeNav(nav: string) {
  selectNav.value = nav
}
</script>

<template>
 <div flex items-center h="100%">
  <div flex flex-row text-16px mx-42px items-center justify-between  w="260px" xl-w="400px" shrink-0>
    <div v-for="nav in navbar" :key="nav" relative cursor-pointer  text-center :class="[{'text-#4343ef font-600':selectNav===nav}]" @click="changeNav(nav)">
      {{ nav }}
      <div h="2px" w="12px" bg="#4343ef" absolute bottom="-2px" left="[calc(50%-6px)]" right="0"  v-show="selectNav===nav"></div>
    </div>
  </div>
  <n-input placeholder="搜索" min-w="200px">
      <template #suffix>
       <i text-16px i-heroicons:magnifying-glass-20-solid block ></i>
      </template>
  </n-input>
  <div flex items-center justify-between   shrink-0 mx40px  min-w="160px">
    <i i-heroicons:heart-20-solid block text-16px cursor-pointer></i>
    <i i-heroicons:heart-20-solid block text-16px cursor-pointer></i>
    <div>
      <n-popover trigger="hover">
    <template #trigger>
      <div flex items-center justify-between  cursor-pointer>
        <n-avatar round>
        <i text-16px i-heroicons:user-solid block></i>
      </n-avatar>
    <span text-16px font-600 ml16px>请登录</span>
      </div>
    </template>
      <span cursor-pointer>扫码登录</span>
  </n-popover>
    </div>
  </div>
 </div>
</template>
