<script setup lang="ts">
const { animationLocalStorage } = useDesignSettingStore()
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <transition :name="animationLocalStorage.isAnimation ? animationLocalStorage.animation : ''" mode="out-in">
      <div :key="route.path" m5 bg="white dark:#18181c" rounded p5 min-h="[calc(100%-80px)]">
        <component :is="Component" />
      </div>
    </transition>
  </RouterView>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
