import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { store } from './store'
import { Provider } from 'react-redux'
import App from './components/App'
import GoogleLoadingPromise, { signin } from './apiCalls/googleAPILoading'
import { writeTest, appendLine, writeTestWithNewSheet } from './apiCalls/loadLastItems'

console.log(`Mode ${process.env.PRODUCTION ? 'Production' : 'Development'}`)

const mainComponent =
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>


GoogleLoadingPromise.then(
  () => {
    signin().then(async () => {
      // In development we render in an empty html file (from .ejs template file)
      // const root = createRoot(document.getElementById('root'))
      //root.render(mainComponent)
      writeTest()
        .then(() => writeTestWithNewSheet())
        .then(() => appendLine())
      console.log('App starting')
    }).catch(e => console.error(e))
  })