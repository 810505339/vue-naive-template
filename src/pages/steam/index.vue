<script setup lang="ts">
import { instance } from '~/api/index'
const search = ref('') // 搜索
const selected = ref('id.asc') // select
const el = ref() // 滚动的List
const title = refDebounced(search, 1000) // 搜索防抖
const list = ref<any>([])
const offset = ref(0) // 请求第几条
const limit = ref(10) // 最大条数
const { data, isFinished, execute, isLoading } = useAxios('', { method: 'GET' }, instance)

watch([title, selected], () => {
  getData()
}, {
  immediate: true,
})
async function getData() {
  offset.value = 0
  await execute({
    params: {
      title: `ilike.%${title.value}%`,
      limit: limit.value,
      offset: offset.value,
      order: `${selected.value}.nullslast`,
    },
  })
  console.log(data.value)

  list.value = data.value
}

useInfiniteScroll(
  window,
  () => {
    execute({
      params: {
        title: `ilike.%${title.value}%`,
        limit: limit.value,
        offset: offset.value,
        order: `${selected.value}.nullslast`,
      },
    })
    if (isFinished)
      offset.value += 10
    list.value = [...list.value, ...data.value]
  },
  {

  },
)
</script>

<template>
  <div max-w="[1440px]" m-auto min-h="100vh">
    <SteamHead />
    <SteamSwiper />
    <div text="28px" sm:text="36px" font="700" mb5>
      <div relative inline-block flex items-center overflow-hidden>
        <div w="30px" sm:w="60px" h="10px" bg="#214B6B" rounded translate-x="-50%" />
        <div shrink-0>
          New & Trending
        </div>
        <div w="127px" h="10px" bg="#214B6B" rounded translate-x="23%" />
      </div>
    </div>
    <SteamSearch v-model:value="search" v-model:selected="selected" />
    <SteamList ref="el" :list="list" />

    <div v-if="isLoading" overflow-hidden relative px="5" sm:px="15">
      <n-skeleton v-for="i in 3" :key="i" height="270px" rounded-3xl my5 />
    </div>
    <i v-if="isLoading" block i-eos-icons-loading text="38px" m-auto py8 />
    <div v-if="list.length <= 0 && isFinished" m-auto py8 text-center text="40px">
      noMore
    </div>
  </div>
</template>

<style scoped>
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<route lang="yaml">
meta:
  layout: login
  </route>
