<script setup lang="ts">
import { storeToRefs } from 'pinia';

const { animationLocalStorage } = storeToRefs(useDesignSettingStore())
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <transition :name="animationLocalStorage.isAnimation ? animationLocalStorage.animation : ''" mode="out-in" appear>
      <div :key="route.path" m5 bg=" " rounded p5 min-h="[calc(100%-108px)]">
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
