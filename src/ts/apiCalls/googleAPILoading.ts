import { getGapiPromise, getGoogleAccountPromise } from '@wwwTs/tools'

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const API_KEY = process.env.GOOGLE_API_KEY
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4'
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets'

let _gapiInited = false
let _gisInited = false
let _resolve
let _tokenClient

console.log('API_KEY', API_KEY + 'string')

const promise = new Promise((resolve) => {
  _resolve = resolve
})

const _maybeEnableGoogleAPI = () => {
  if (_gapiInited && _gisInited) {
    _resolve()
  }
}

export const gapiPostInit = () => {
  let _resolve, _reject
  const promise = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })

  async function asyncFn () {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    })
    _gapiInited = true
    _resolve()
  }

  gapi.load('client', {
    callback: asyncFn,
    onerror: function () {
      // Handle loading error.
      console.error('gapi.client failed to load!')
    },
    timeout: 4000,
    ontimeout: function () {
      console.error('timeout')
      _reject()
    }
  })

  return promise
}

export const gapiPromise = getGapiPromise()
  .then(() => console.log('Gapi is ready !', gapi))
  .then(() => {

  })

let _signinResolve
const _signinCbk = async (resp) => {
  if (resp.error !== undefined) {
    console.error('connexion error', resp.error)
    throw (resp)
  }
  console.log('User has signed in')
  _signinResolve()
}
const _signinPromise = new Promise((resolve) => {
  _signinResolve = resolve
})


export const signin = () => {
  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    _tokenClient.requestAccessToken(/*{prompt: 'consent'}*/)
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    _tokenClient.requestAccessToken({ prompt: '' })
  }

  return _signinPromise
}

const googleAccountPromise = getGoogleAccountPromise()
googleAccountPromise
  .then(() => console.log('Google account lib is ready', google.accounts.oauth2))
  .then(() => {
    _tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: _signinCbk,

    })
    console.log('tokenClient', _tokenClient)
    _gisInited = true
    _maybeEnableGoogleAPI()
  })
  .catch(e => console.error('Error in GoogleAccount', e))

export default promise