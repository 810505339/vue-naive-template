<script setup lang="ts">
import { instance } from '~/api'
import dayjs from 'dayjs'
// 热歌榜
const { data } = useAxios('/playlist/detail?id=3778678', instance)
const playList = computed(() => {
  return data.value?.playlist?.tracks.slice(0, 4)
})
function durationStr(dt:number){
  return dayjs(dt).format('mm:ss')
}
</script>

<template>
  <div fixed z-10 w="400px" right="0" top="80px" rounded-tl-3xl h="100%" bg=" white dark:#18181c" px="24px" pt="32px">
    <div>
      <div flex items-center justify-between>
      <span text-18px font-600>TOP 100 WEEKLY</span>
      <span text-14px text="#787887">MORE LIST</span>
    </div>
    <div>
      <div v-for="(play,i) in playList" :key="play.id" flex items-center w="100%" justify-evenly py-12px my-6px>
        <span mr-15px text="#787887">0{{ i+1 }}</span>
        <img
          :src="play.al.picUrl" w="50px" h="50px" mr-8px
          rounded
        >
        <div basis="1/2">
          <div font-600 text-16px>
            {{play.name}}
          </div>
          <div text="#787887 13px" mt-3px>
            {{play.ar.map((p:any)=>p.name).join('/')}}
          </div>
        </div>
        <span text-13px text="#787887">{{durationStr(play.dt)}}</span>
        <i icon-btn i-heroicons:ellipsis-vertical-20-solid text-18px font-600 />
      </div>
    </div>
    </div>

    <div>
      <div font-500 text-18px  text="#787887 center" mb-16px >NOW PLAYING</div>
      <div text-center>
        <img rounded-16px w="200px" h="120px" inline-block  src="https://img.js.design/assets/img/643c115759a24ca2f6d8cc0b.webp#08a09d56643a5eb848271d4c4dceb8c6"/>
        <div text="#24242e 24px" font-700>Dynamite</div>
        <div text="#4d4d56 16px" font-500>BTS</div> 
        <n-slider  :step="10" />
        <div flex items-center justify-between text-14px my-12px>
          <span>2:18</span>
          <span>4:15</span>
        </div>

        <div flex items-center w="100%" justify-between mt-12px>
          <i icon-btn i-ic:sharp-shuffle text="#b4b4f8 20px"></i>
          <div text="#4343ef " flex items-center min-w="200px" justify-between>
            <i icon-btn i-ic:baseline-skip-previous text-28px></i>
            <div w="42px" h="42px" bg="#4343ef" rounded-full flex items-center justify-center>
              <i icon-btn i-ic:baseline-play-arrow text="white 25px"></i>
            </div>
            <i icon-btn i-ic:baseline-skip-next text-28px></i>
          </div>
          <i icon-btn  text="#b4b4f8 20px" i-ic:sharp-repeat ></i>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

.n-slider .n-slider-handles .n-slider-handle-wrapper :deep(.n-slider-handle){
  background-color:#4343ef;
}
</style>
