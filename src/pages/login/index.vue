<script setup lang="ts">
onMounted(() => {
  nextTick(() => {
    const obj = new WxLogin({
      self_redirect: true,
      id: 'login_container',
      appid: 'wx1b1b3d3c419f666d',
      scope: 'snsapi_login',
      redirect_uri: encodeURIComponent('www.baidu.com'),
      style: 'black',
    })
  })
})
</script>

<template>
  <div id="login_container" />
  login
</template>

<route lang="yaml">
meta:
  layout: login
</route>
