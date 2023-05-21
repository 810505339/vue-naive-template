<script setup lang="ts">
import { instance } from '~/api'
const createLoginKey= useAxios('/login/qr/key', instance,{immediate:false})
const createloginQr= useAxios('/login/qr/create', instance,{immediate:false})
const loginCheck=useAxios('/login/qr/check',instance,{immediate:false})
const timestamp=useNow()
const showModal=ref(false)
const qrImg=ref('')
const message = useMessage()

const navbar = [
  'Music',
  'Podcast',
  'Radio',
  'Live',
]
const selectNav = ref('Music')


const { pause, resume } = useIntervalFn(async() => {
  /* your function */
  const {data}=await loginCheck.execute({
    params:{
      key:createLoginKey.data.value.data.unikey,
      timestamp:timestamp.value
    }
  })
  if(data.value.code==803)
  {
    message.success('登录成功')
    pause()
    console.log(data.value);
  }
}, 2000,{
  immediate:false
})

function changeNav(nav: string) {
  selectNav.value = nav
}

async function qrLogin(){
 const {data}=await createLoginKey.execute(
  {
    params:{timestamp:timestamp.value}
  }
 )
 await createloginQr.execute({
  params:{
    key:data.value.data.unikey,
    timestamp:timestamp.value,
    qrimg:true
  }
})
showModal.value=true
qrImg.value=createloginQr.data.value.data.qrimg

//启动扫码
resume()

}


</script>

<template>

  <n-modal v-model:show="showModal">
    <n-card
      style="width:300px"
      title="扫码登录"
      :bordered="true"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <i icon-btn i-heroicons:x-mark-solid @click="showModal=false"></i>
      </template>
      <div flex items-center justify-center>
        <img :src="qrImg"/>
      </div>
      <template #footer>
        <div text-center>请使用网易云app</div>
      </template>
    </n-card>
  </n-modal>

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
      <span cursor-pointer @click="qrLogin">扫码登录</span>
  </n-popover>
    </div>
  </div>
 </div>
</template>
