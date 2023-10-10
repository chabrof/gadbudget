import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { store } from './store'
import { Provider } from 'react-redux'
import App from './components/App'
import GoogleLoadingPromise, { signin } from './apiCalls/googleAPILoading'

console.log(`Mode ${process.env.PRODUCTION ? 'Production' : 'Development'}`)

const mainComponent =
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>

async function listMajors () {
  let response
  try {
    // Fetch first 10 files
    response = await (gapi.client as any).sheets.spreadsheets.values.get({
      //spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
      spreadsheetId: '1L4mulEYdrYsD6xZ20NgS7vzxD7tK29joijHrVRK04JI',
      //range: 'Class Data!A2:E',
      range: 'main!A1:A3',
    })
  } catch (err) {
    console.error(err)
    return
  }
  const range = response.result
  if (!range || !range.values || range.values.length == 0) {
    console.log('No values found.')
    return
  }
  console.log('out', range)
}


const writeTest = () => {
  try {
    return (gapi.client as any).sheets.spreadsheets.values.update({
      spreadsheetId: '1L4mulEYdrYsD6xZ20NgS7vzxD7tK29joijHrVRK04JI',
      range: 'main!A2:C2',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [['12/02/2023', '12,23 €', 'Boulangerie']],
      },
    }).then((response) => {
      const result = response.result
      console.log(`${result.updatedCells} cells updated.`)
    })
  } catch (err) {
    console.error(err)
    return
  }
}



GoogleLoadingPromise.then(
  () => {
    signin().then(async () => {
      await listMajors()
      writeTest()
    })
    if (process.env.PRODUCTION) {
      // En production on utilise "l'hydration" qui change dynamiquement les pages pre generees
      hydrateRoot(document.getElementById('root'), mainComponent)
    } else {
      // In development we render in an empty html file (from .ejs template file)
      const root = createRoot(document.getElementById('root'))
      root.render(mainComponent)
    }
    console.log('App starting')
  })