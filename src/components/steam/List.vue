<script setup lang="ts">
defineProps<{
  list: Array<any>

}>()
</script>

<template>
  <div transition-all px="5" sm:px="15">
    <div>
      <div v-for="item in list" :key="item.id" rounded-3xl flex my5 overflow-hidden flex-col lg:flex-row>
        <img :src="item.image">
        <div bg="#17202D" w="100%" p5 relative>
          <div font="600" text="28px white" overflow-hidden lg:pr="40px">
            {{ item.title }}
          </div>
          <div text="20px white" font="400" opacity-50 overflow-hidden tracking-wider>
            {{ item.tags.join(', ') }}
          </div>
          <div w="127px" h="10px" bg="#214B6B" rounded my5 />
          <div font="700" text="40px white" flex items-center justify-between lg:justify-end>
            <i
              i-material-symbols-window-sharp inline-block bg="#214B6B" text="40px" lg:absolute lg:top="5"
              lg:right="5"
            />
            <span> $ {{ item.price }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
