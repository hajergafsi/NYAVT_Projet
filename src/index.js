// ** React Imports
import { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'

// ** Redux Imports
import { Provider } from 'react-redux'
// import { store } from './redux/storeConfig/store'
import * as _redux from "./redux"
import store, { persistor } from "./redux/store"
import axios from "axios";

// ** Toast & ThemeColors Context
import { ToastContainer } from 'react-toastify'
import { ThemeContext } from './utility/context/ThemeColors'

// ** Spinner (Splash Screen)
import Spinner from './@core/components/spinner/Fallback-spinner'

// ** Ripple Button
import './@core/components/ripple-button'

// ** PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** React Toastify
import '@styles/react/libs/toastify/toastify.scss'

// ** Core styles
import './@core/assets/fonts/feather/iconfont.css'
import './@core/scss/core.scss'
import './assets/scss/style.scss'

import { MetronicI18nProvider } from './@core/i18n'

// ** Service Worker
import * as serviceWorker from './serviceWorker'

const { PUBLIC_URL } = process.env

_redux.setupAxios(axios, store)

// ** Lazy load app
const LazyApp = lazy(() => import('./App'))

ReactDOM.render(
  <MetronicI18nProvider>
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <ThemeContext>
          <LazyApp store={store} persistor={persistor} basename={PUBLIC_URL} />
          <ToastContainer newestOnTop />
        </ThemeContext>
      </Suspense>
    </Provider>
  </MetronicI18nProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
