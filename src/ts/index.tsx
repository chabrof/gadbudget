import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { store } from './store'
import { Provider } from 'react-redux'
import App from './components/App'

console.log(`Mode ${process.env.PRODUCTION ? 'Production' : 'Development'}`)

const mainComponent =
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>


if (process.env.PRODUCTION) {
  // En production on utilise "l'hydration" qui change dynamiquement les pages pre generees
  hydrateRoot(document.getElementById('root'), mainComponent)
} else {
  // In development we render in an empty html file (from .ejs template file)
  const root = createRoot(document.getElementById('root'))
  root.render(mainComponent)
}
console.log('App starting')