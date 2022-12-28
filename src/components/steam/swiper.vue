<script setup lang="ts">
import { instance } from '~/api/index'
const { data, isFinished } = useAxios('&limit=5&offset=0&order=price.asc.nullslast', instance)
const carousel = ref()
let isCard = $ref(true)
useResizeObserver(carousel, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  isCard = width >= 768
})
</script>

<template>
  <div v-if="!isFinished" flex overflow-hidden h="270px" relative mb="12.5">
    <n-skeleton width="578px" height="100%" rounded-3xl translate-x="-172%" translate-z="-100px" absolute left="50%" />
    <n-skeleton width="578px" height="100%" rounded-3xl absolute left="50%" translate-x="-50%" />
    <n-skeleton width="578px" height="100%" rounded-3xl translate-x="72%" translate-z="-100px" absolute left="50%" />
  </div>
  <n-carousel
    v-else ref="carousel" :effect="isCard ? 'card' : 'slide'" h="320px"
    prev-slide-style="transform: translateX(-180%) translateZ(-100px);"
    next-slide-style="transform: translateX(80%) translateZ(-100px);"
  >
    <n-carousel-item v-for="item in data" :key="item.id" :style="{ width: isCard ? '40%' : '100%' }">
      <img :src="item.image" rounded-3xl w="100%" h="270px">
    </n-carousel-item>
  </n-carousel>
</template>
