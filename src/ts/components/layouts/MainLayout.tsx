import React from 'react'
import { useSelector } from 'react-redux'
import { getLastError }
  from '@wwwTs/store/selectors/common'
import { Outlet } from 'react-router-dom'
import { Error } from '@wwwTs/store/errorsSlice'

type MainLayoutProps = {
  header: React.ReactElement,
  footer: React.ReactElement,
  ErrorCpt: any,
  // children: React.ReactElement
}

export default function MainLayout({ header, footer, ErrorCpt }: MainLayoutProps) {
  const error: Error = useSelector(getLastError)

  return (
    <>
      {header}
      {error && <ErrorCpt title={error.title} message={error.message} link={error.link} />}
      <Outlet />
      {footer}
    </>
  )
}