<script setup lang="ts">
import { instance } from '~/api/index'
const { data } = useAxios('/banner?type=2', instance)
</script>

<template>
  <n-button type="primary">
    按钮
  </n-button>
</template>

