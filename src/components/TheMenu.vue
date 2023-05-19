<script setup lang="ts">
const route = useRoute()
const selectedKey = ref()

watchEffect(() => {
  selectedKey.value = route.name
})

const select = ref('Discover')
const menu = [
  {
    label: 'MENU',
    children: [
      {
        icon: 'i-heroicons:home-20-solid',
        label: 'Discover',
      },
      {
        icon: 'i-heroicons:square-2-stack-20-solid',
        label: 'Explorer',
      },
      {
        icon: 'i-heroicons:magnifying-glass',
        label: 'Search',
      },
    ],
  },
]

function changeMenu(selectedKey: string) {
  select.value = selectedKey
}

</script>

<template>
  <div>
    <div font-700 text-22px text="#4343ef" block flex items-center h100px w="100%" justify-center cursor-pointer>
      <span w-24px h-24px rounded-full bg="#4343ef" text-white inline flex items-center justify-center>
        <i i-heroicons-musical-note-20-solid inline-block text-10px />
      </span>
      <div pl-4>
        Mytones
      </div>
    </div>
    <div>
      <div v-for="(m, i) in menu" :key="i">
        <div text="#24242e  18px tracking-normal" dark:text-gray-200 pl-42px>
          {{ m.label }}
        </div>
        <div>
          <div v-for="(c, j) in m.children" :key="j" h-46px pl-42px flex items-center cursor-pointer hover="bg-gray-50"
            dark:hover="bg-gray-1/2" :class="[{ 'text-#4343ef': select == c.label }]" @click="changeMenu(c.label)"
            relative>
            <i :class="[c.icon]" inline-block h-16px w-16px />
            <div pl-23px text-16px font-400 tracking-normal>
              {{ c.label }}
            </div>
            <div absolute w6px h46px bg="#4343ef" top="0" right-0 v-show="c.label === select"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
