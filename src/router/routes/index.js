import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home')),
    // layout: 'BlankLayout',
  },
  {
    path: '/second-page',
    component: lazy(() => import('../../views/SecondPage'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../app/modules/Auth/pages/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  // {
  //   path: '/',
  //   component: lazy(() => import('../../app/modules/Landing/pages/index')),
  //   layout: 'BlankLayout',
  //   meta: {
  //     authRoute: true
  //   }
  // },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
