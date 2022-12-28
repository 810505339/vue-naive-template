import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import Previewer from 'virtual:vue-component-preview'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase'
import App from './App.vue'
import type { UserModule } from './types'

import generatedRoutes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.less'
import 'uno.css'

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    ctx.app.use(Previewer)
    ctx.app
      .use(VueFire, {
        // imported above but could also just be created here
        firebaseApp,
        modules: [
          // we will see other modules later on
          VueFireAuth(),
        ],
      })
  },
)

