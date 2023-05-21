<script setup lang="ts">
import { instance } from '~/api/index'
const { data } = useAxios<{ banners: Array<any> }>('/banner', instance)
console.log(data.value?.banners);

function tagStyle(color:string){
    return color==='blue'? `bg-blue-7`:'bg-red-7'
}

</script>

<template>
  <div max-w="676px" mx="32px">
    <n-carousel
    direction="vertical"
    dot-placement="right"
    style="width: 100%; height: 240px"
    draggable
    autoplay
  >
    <div v-for="item in data?.banners" :key="item.targetId"  relative rounded-xl>
      <img :src="item.imageUrl" w="100%"  h="240px" object-fill rounded-xl >
      <div absolute bottom="0" z-10 left="0" rounded py-2px px-1  text-12px font-400 text-white  :class="[tagStyle(item.titleColor),]"   >{{item.typeTitle}}</div>
    </div>
    <template #dots="{ total, currentIndex, to }">
      <ul class="custom-dots">
        <li
          v-for="index of total"
          :key="index"
          :class="{ ['is-active']: currentIndex === index - 1 }"
          @click="to(index - 1)"
        />
      </ul>
    </template>
  </n-carousel>
  </div>
  <PlayList></PlayList>
</template>
<style scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.custom-arrow {
  display: flex;
  position: absolute;
  bottom: 25px;
  right: 10px;
}

.custom-arrow button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: 12px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-width: 0;
  border-radius: 8px;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-arrow button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.custom-arrow button:active {
  transform: scale(0.95);
  transform-origin: center;
}

.custom-dots {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 20px;
  right: 20px;
}

.custom-dots li {
  display: inline-block;
  width: 4px;
  height: 12px;
  margin: 3px 0;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  transition: height 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  height: 40px;
  background: #4343ef;
}
</style>
