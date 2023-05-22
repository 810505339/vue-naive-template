<script setup lang="ts">
import { instance } from '~/api'
import dayjs from 'dayjs'
import usePlayingList,{PlayModel} from '~/store/modules/playingList';
// 热歌榜
const { data } = useAxios('/playlist/detail?id=3778678', instance)
const playList = computed(() => {
  return data.value?.playlist?.tracks.slice(0, 4)
})
function durationStr(dt:number){
  return dayjs(dt).format('mm:ss')
}

const playListStore = usePlayingList()
const audio = ref()
const src=ref(playListStore.selectItem?.url)
//切换歌曲

const { playing, currentTime, duration, volume } = useMediaControls(audio, { 
  src:src
})

watch(()=>playListStore.selectIndex,()=>{
  playing.value=false
  src.value=playListStore.selectItem.url
  setTimeout(()=>{
    playing.value=true
  },200)
  
})

//时长进度条
const slider=ref(0)

//点击播放跟暂停
function changePlay(){
  playing.value = !playing.value
}

//修改模式
function changeModel(){
  playListStore.playmodel=playListStore.playmodel===2? 0:playListStore.playmodel+1
}
//点击拉动歌曲进度条
function updateSlider(value: number){
  console.log((value*duration.value)/100);
  slider.value=value
  currentTime.value=(value*duration.value)/100
  playing.value=true
}
//?id=2026224214&level=exhigh
const getMusicUrl=useAxios('/song/url/v1',instance,{immediate:false })
//点击top100单曲
async function playMusic(play:any){
 const {data}=await getMusicUrl.execute({
   params:{
    id:play.id,
    level:'standard'
   }
  })
  const url=data.value.data[0].url
  play.url=url
  playListStore.playSong(play)
  currentTime.value=0;
  playing.value=true;
}

const playIcon=computed(()=>{
  return !playing.value?`i-ic:baseline-play-arrow`:`i-ic:baseline-pause`
})

//正在播放时长显示
const currentTimeFormat=computed(()=>{
  return dayjs.unix(currentTime.value).format('mm:ss')
})
//总时长显示
const durationFormat=computed(()=>{
  return dayjs.unix(duration.value).format('mm:ss')
})
//播放模式显示
const playModelFormat=computed(()=>{
  const playModelList=["随机播放","循环播放","单曲循环"]
    return playModelList[playListStore.playmodel]
})

const playModelIcon=computed(()=>{
  const playModelIconList=["i-ic:sharp-shuffle","i-ic:outline-repeat","i-ic:baseline-repeat-one"]
    return playModelIconList[playListStore.playmodel]
})

//监听进度条
watch(()=>currentTime.value,()=>{
  slider.value=(currentTime.value/duration.value) *100
  //如果播放完毕
  if(currentTime.value===duration.value)
  {
    //如果是单曲循环就再次播放
    if(playListStore.playmodel===PlayModel.loop)
    {
      currentTime.value=0
      setTimeout(()=>{
        playing.value=true
      },200)
      return 
    }
    playListStore.next()
  }
})



</script>

<template>
  
  <div @click="playListStore.clear">{{playListStore.selectItem}}</div>
  
  <audio ref="audio" hidden></audio>
  <div fixed z-10 w="400px" right="0" top="80px" rounded-tl-3xl h="100%" bg=" white dark:#18181c"  pt="20px">
    <div >
      <div flex items-center justify-between px="24px">
      <span text-18px font-600>TOP 100 WEEKLY</span>
      <span text-14px text="#787887">MORE LIST</span>
    </div>
    <div my8px>
      <div v-for="(play,i) in playList" :key="play.id" flex items-center w="100%" justify-evenly py-8px px="24px" hover="bg-gray-50 dark:bg-gray-2/3" @click="playMusic(play)">
        <span mr-15px text="#787887">0{{ i+1 }}</span>
        <img
          :src="play.al.picUrl" w="50px" h="50px" mr-8px
          rounded
        >
        <div basis="1/2">
          <div font-600 text-16px truncate>
            {{play.name}}
          </div>
          <div text="#787887 13px" mt-3px truncate>
            {{play.ar.map((p:any)=>p.name).join('/')}}
          </div>
        </div>
        <span text-13px text="#787887">{{durationStr(play.dt)}}</span>
        <i icon-btn i-heroicons:ellipsis-vertical-20-solid text-18px font-600 />
      </div>
    </div>
    </div>

    <div px="24px">
      <div font-500 text-18px  text="#787887 center" mb-10px >NOW PLAYING</div>
      <div text-center>
        <img rounded-16px w="200px" h="120px" inline-block blur="0.5"  :src="playListStore.selectItem?.al?.picUrl" v-if="playListStore.selectItem?.al?.picUrl"/>
        <div text="#24242e dark:white 24px" font-700 my-4px>{{playListStore.selectItem?.name}}</div>
        <div text="#4d4d56 16px" font-500 mb-8px>{{playListStore.selectItem?.ar?.map((p:any)=>p.name).join('/')}}</div> 
        <n-slider  :tooltip="false" v-model:value="slider" :on-update:value="updateSlider" />
        <div flex items-center justify-between text-14px  mt-6px>
          <span text="#4343ef">{{currentTimeFormat}}</span>
          <span>{{durationFormat}}</span>
        </div>

        <div flex items-center w="100%" justify-between >
          <n-popover trigger="hover" :show-arrow="false">
            <template #trigger>
              <i icon-btn  :class="[playModelIcon]" text="#b4b4f8 20px" @click="changeModel"></i>
            </template>
              <span>{{playModelFormat}}</span>
          </n-popover>


          <div text="#4343ef"  flex items-center min-w="150px" justify-between>
            <i icon-btn i-ic:baseline-skip-previous text-28px @click="playListStore.previous"></i>
            <div w="42px" h="42px" bg="#4343ef" rounded-full flex items-center justify-center @click="changePlay">
              <i icon-btn  text="white 25px"  :class="[playIcon]" ></i>
            </div>
            <i icon-btn i-ic:baseline-skip-next text-28px @click="playListStore.next"></i>
          </div>
          <n-popover trigger="hover" :show-arrow="false">
            <template #trigger>
              <i icon-btn  text="#b4b4f8 20px" i-ic:baseline-format-list-bulleted ></i>
            </template>
              <span>播放列表</span>
          </n-popover>
         
        </div>
        <div  text-center mt20px>
          <i icon-btn  text="#b3b3bc 20px" i-ic:twotone-expand-less inline-block></i>
          <div text="#787887 15px"  font-500>Lyrics</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>


:global(.n-slider .n-slider-handles .n-slider-handle-wrapper .n-slider-handle) {
  
}

:global(.n-slider .n-slider-handles:hover .n-slider-handle){
  visibility:visible
}


</style>
