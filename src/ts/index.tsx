import React, { useState, useCallback, useEffect } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { store } from './store'
import { Provider } from 'react-redux'
import App from './components/App'
// import GoogleLoadingPromise, { signin } from './apiCalls/googleAPILoading'
import { useLoadExtScript } from './tools/hooks'
import { gapiPromise } from './apiCalls/googleAPILoading'
import { writeTest, getSpshInfos, appendLine, deleteLine, createSheet } from './apiCalls/loadLastItems'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { addError, resetErrors } from '@wwwTs/store/errorsSlice'
import { useDispatch } from 'react-redux'
import { gapiPostInit } from '@wwwTs/apiCalls/googleAPILoading'

console.log(`Mode ${process.env.PRODUCTION ? 'Production' : 'Development'}`)

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID

const Splash = () => <h1>Gad Budget</h1>

const MainComponent = () => {
  const dispatch = useDispatch()
  const [gapiLoaded, setGapiLoaded] = useState(false)
  const onGapiLoadedCbk = useCallback(() => setGapiLoaded(true), [])
  const onGapiLoadErrorCbk = useCallback(
    () => dispatch(addError({
      message: 'Google API loading error'
    })), [dispatch])

  useLoadExtScript('https://apis.google.com/js/api.js', onGapiLoadedCbk, onGapiLoadErrorCbk, gapiPostInit)
  return (
    <>
      {
        gapiLoaded
          ?
          <GoogleOAuthProvider clientId={CLIENT_ID}>
            <App />
          </GoogleOAuthProvider>
          :
          <Splash/>
      }
    </>
  )
}

// const googleConnectComponent =
const root = createRoot(document.getElementById('root'))
root.render(<Provider store={store}><MainComponent/></Provider>)
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