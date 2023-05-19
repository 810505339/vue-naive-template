<template>
  <main class="text-gray-700 dark:text-gray-200 ">
    <n-layout has-sider position="absolute">
      <n-layout-sider collapse-mode="width" :collapsed-width="0" :width="260" show-trigger="bar" bordered>
        <TheMenu />
      </n-layout-sider>
      <n-layout-content bg="slate-50 dark:black">
        <n-layout-header style="height: 64px; padding: 24px" bordered position="static">
          <TheHeader />
        </n-layout-header>
        <DefaultRouterView />
      </n-layout-content>
    </n-layout>
    <ThemeSetting />
  </main>
</template>
