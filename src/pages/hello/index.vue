<script setup lang="ts">
const active = $ref(false)
</script>

<template>
  <n-button type="primary" @click="active = true">
    设置
  </n-button>
  <n-drawer v-model:show="active" :width="502" placement="right">
    <n-drawer-content title="设置">
      《斯通纳》是美国作家约翰·威廉姆斯在 1965 年出版的小说。
    </n-drawer-content>
  </n-drawer>
</template>
