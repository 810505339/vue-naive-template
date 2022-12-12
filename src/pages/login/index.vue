<script setup lang="ts">
const router = useRouter()
onMounted(() => {
  nextTick(() => {
    // wxe60924bc3543a091
    const obj = new WxLogin({
      self_redirect: false,
      id: 'login_container',
      appid: 'wxbdc5610cc59c1631',
      scope: 'snsapi_login',
      redirect_uri: 'https%3A%2F%2Fpassport.yhd.com%2Fwechat%2Fcallback.do',
      style: 'black',
      state: Math.random(),
    })
  })
})
</script>

<template>
  <n-button type="primary" @click="router.back()">
    返回
  </n-button>
  <div id="login_container" />
</template>

<route lang="yaml">
meta:
  layout: login
</route>
