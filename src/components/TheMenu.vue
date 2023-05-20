<script setup lang="ts">
const router = useRouter()
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
  {
    label: 'LIBRARY',
    children: [
      {
        icon: 'i-heroicons:musical-note-20-solid',
        label: 'My Music',
      },
      {
        icon: 'i-heroicons:rectangle-stack-solid',
        label: 'Albums',
      },
      {
        icon: 'i-heroicons:user-solid',
        label: 'Artists',
      },
    ],
  },
  {
    label: 'PLAYLIST',
    children: [
      {
        icon: 'i-jam:headset-f',
        label: 'Cover',
      },
      {
        icon: 'i-heroicons:heart-20-solid',
        label: 'Favorites',
      },
      {
        icon: 'i-heroicons:share-solid',
        label: 'Shared',
      },
      {
        icon: 'i-heroicons:folder-arrow-down-20-solid',
        label: 'Downloads',
      },
    ],
  },
  {
    label: 'OTHERS',
    children: [
      {
        icon: 'i-heroicons:adjustments-horizontal',
        label: 'Settings',
      },
      {
        icon: 'i-heroicons:arrow-left-on-rectangle-20-solid',
        label: 'Logout',
      },
    ],
  },
]

function changeMenu(selectedKey: string) {
  select.value = selectedKey
 
  router.push({
    name:`${selectedKey.toLocaleLowerCase()}`
  });
}

</script>

<template>
  <div>
    <div font-700 text-22px text="#4343ef" block flex items-center h60px w="100%" justify-center cursor-pointer>
      <span w-24px h-24px rounded-full bg="#4343ef" text-white inline flex items-center justify-center>
        <i i-heroicons-musical-note-20-solid inline-block text-10px />
      </span>
      <div pl-4>
        Mytones
      </div>
    </div>
    <div>
      <div v-for="(m, i) in menu" :key="i">
        <div text="#24242e  18px tracking-normal" dark:text-gray-200 pl-42px pb-8px>
          {{ m.label }}
        </div>
        <div pb-13px>
          <div v-for="(c, j) in m.children" :key="j" h-46px pl-42px flex items-center cursor-pointer hover="bg-gray-50"
            dark:hover="bg-gray-2/3"
            :class="[{ 'text-#4343ef font-600 bg-gray-50 dark-bg-gray-2/3 ': select == c.label }]"
            @click="changeMenu(c.label)" relative>
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
