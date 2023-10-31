import * as React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { store } from './store'
import { Provider } from 'react-redux'
import App from './components/App'
// import GoogleLoadingPromise, { signin } from './apiCalls/googleAPILoading'
import { gapiPromise } from './apiCalls/googleAPILoading'
import { writeTest, getSpshInfos, appendLine, deleteLine, createSheet } from './apiCalls/loadLastItems'
import { GoogleOAuthProvider } from '@react-oauth/google'

console.log(`Mode ${process.env.PRODUCTION ? 'Production' : 'Development'}`)

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const mainComponent =
  <GoogleOAuthProvider clientId={CLIENT_ID}>
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>

// const googleConnectComponent =
const root = createRoot(document.getElementById('root'))
root.render(mainComponent)
/* gapiPromise
  .then(
    () => {
      const root = createRoot(document.getElementById('root'))
      root.render(mainComponent)
    }
  )*/
/*
GoogleLoadingPromise.then(
  () => {
    signin().then(async () => {
      // In development we render in an empty html file (from .ejs template file)
      const root = createRoot(document.getElementById('root'))
      root.render(mainComponent)
      writeTest()
        //.then(() => appendLine())
        .then(() => getSpshInfos())
        //.then(() => deleteLine())
        //.then(() => createSheet())
      console.log('App starting')
    }).catch(e => console.error(e))
  })
  */