import * as React from 'react'
import { GoogleLogin } from '@react-oauth/google'

export const GoogleConnectBox = () =>  {
  return <GoogleLogin
    onSuccess={
      async credentialResponse => {
        const idToken = credentialResponse.credential
        console.log('credential response', credentialResponse)
        /*
        await axios.post(`${process.env.AUTH_URL}`, { idToken }, { withCredentials: true })
          .then(async (res) => {
            localStorage.setItem('access_token', res.data.access_token)
            // eslint-disable-next-line
            // @ts-ignore: Unreachable code error
            await authMe(dispatch, navigate, location)
              .then(() => {
                if (prevPath) {
                  navigate(prevPath) // redirecting to previous page
                }
              })
          })*/
      }}
    onError={
      () => { console.log('Login Failed') }} />
}