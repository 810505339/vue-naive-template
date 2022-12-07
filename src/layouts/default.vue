<template>
  <main class="text-gray-700 dark:text-gray-200 ">
    <n-layout position="absolute">
      <n-layout-header style="height: 64px; padding: 24px" bordered>
        <TheHeader />
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 64px; ">
        <n-layout-sider collapse-mode="width" :collapsed-width="0" :width="260" show-trigger="arrow-circle" bordered>
          <TheMenu />
        </n-layout-sider>
        <n-layout-content bg="slate-50 dark:black">
          <div m5 bg="white dark:#18181c" rounded p5 min-h="[calc(100%-80px)]">
            <RouterView />
          </div>
        </n-layout-content>
      </n-layout>
    </n-layout>
    <ThemeSetting />
  </main>
</template>
