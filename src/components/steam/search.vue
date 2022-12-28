<script setup lang="ts">
defineProps<{
  selected: string
  value: string
}>()
const emits = defineEmits(['update:value', 'update:selected'])
const sortList = ['id.asc', 'id.desc', 'price.asc', 'price.desc', 'title.asc', 'title.desc']
</script>

<template>
  <div sm:px15 px5 md:flex md:items-center md:justify-between>
    <input
      placeholder="Search" box-border bg="#1A3A53" w="100%" md:w="300px" font="600" text="16px" rounded-full px10
      py2 placeholder:text-opacity-50 type="text" :value="value"
      @input="(e) => emits('update:value', (e.target as HTMLInputElement).value)"
    >
    <div text="16px" mt="3" flex items-center>
      <div shrink-0>
        Sort by:
      </div>
      <select
        bg="#1A3A53" ml="2.5" w="100%" text="16px" rounded-full px10 py2
        :value="selected" @change="(e) => emits('update:selected', (e.target as HTMLInputElement).value)"
      >
        <option v-for="item in sortList" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
    </div>
  </div>
</template>
