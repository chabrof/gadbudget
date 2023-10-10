export const getGapiPromise = () => {
  const asyncFn = (resolve: (value: unknown) => void) => {
    console.log('ici')
    globalThis.__declare_gapi_ready = resolve
  }
  return new Promise(asyncFn)
}

export const getGoogleAccountPromise = () => {
  const asyncFn = (resolve: (value: unknown) => void) => {
    console.log('ici 2')
    globalThis['__declare_google.accounts.oauth2_ready'] = resolve
  }
  return new Promise(asyncFn)
}