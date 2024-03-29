import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import Previewer from 'virtual:vue-component-preview'
import App from './App.vue'
import type { UserModule } from './types'

import generatedRoutes from '~pages'

import '@unocss/reset/tailwind.css'
import 'uno.css'
import './styles/main.less'
const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  async (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    ctx.app.use(Previewer)
    // full naive-ui
    if (ctx.isClient) {
      await import('naive-ui').then((naive) => {
        ctx.app.use(naive.default)
      })
    }
  },
)

