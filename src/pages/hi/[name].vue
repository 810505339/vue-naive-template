<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
const showModal = ref(false)
const list = ref(
  [
    {
      label: 'A',
      id: uuidv4(),
      children: [
        {},
        {},
      ],
    },

  ],
)

const options = [
  {
    label: 'A',
    value: 'A',
  },
  {
    label: 'B',
    value: 'B',
  },
  {
    label: 'C',
    value: 'C',
  },
]

const selected = ref('A') // 所选的LABEL

const selectItem = ref<{
  label: string
  id: string
  children: {}[]
}>() // 所选的Item
const selectIndex = ref(0) // 点击的item children的index
function add(item: {
  label: string
  id: string
  children: {}[]
}, k: number) {
  showModal.value = !showModal.value
  selectItem.value = item
  selectIndex.value = k
}
// 点击保存按钮
function save() {
  const index = list.value.findIndex(l => l.id === selectItem.value?.id)
  console.log(selectItem.value?.id)

  // 如果点击相同
  if (selectItem.value!.label === selected.value) { // 找到了
    if (~index)
      list.value[index].children.push({})
  }
  else {
    // 点击添加不同
    // 判断是否是最后一个

    if (selectIndex.value === list.value[index].children.length - 1) {
      list.value.splice(index + 1, 0, {
        label: selected.value,
        id: uuidv4(),
        children: [{}],
      })
    }
    else {
      const len = list.value[index].children.length
      const tempChildren = list.value[index].children.slice(selectIndex.value + 1, len)
      list.value[index].children = list.value[index].children.slice(0, selectIndex.value + 1)
      list.value.splice(index + 1, 0, {
        label: selected.value,
        id: uuidv4(),
        children: [{}],
      })
      list.value.splice(index + 2, 0, {
        label: list.value[index].label,
        id: uuidv4(),
        children: [...tempChildren],
      })
    }
  }
  showModal.value = !showModal.value
}
</script>

<template>
  <n-modal v-model:show="showModal">
    <div w="240px" text-center>
      <n-select v-model:value="selected" :options="options" />
      <button btn mt-30px @click="save">
        保存
      </button>
    </div>
  </n-modal>
  <div v-for="item in list" :key="item.id">
    {{ item.label }}
    <div v-for="_,j in item.children" :key="j" w="240px" flex items-center justify-between my-10px>
      第{{ j+1 }}项
      <div>
        <button btn mr-10px @click="add(item,j)">
          添加
        </button>
        <button btn>
          删除
        </button>
      </div>
    </div>
  </div>
</template>
