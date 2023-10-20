import React, { lazy, Suspense, useEffect } from 'react'
import '../scss/main.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import PageHelmet from './helmet/PageHelmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Footer } from './layouts/Footer'
import { Middle } from './layouts/Middle'
import { Header } from './layouts/Header'
import { AddButton, LastWritings } from './LastWritings'
import { signin } from '@wwwTs/apiCalls/googleAPILoading'

function Home () {
  return (
    <>
      <Header />
      <button onClick={() => signin()}>Click</button>
      <Middle content={
        <>
          <LastWritings />
          <AddButton />
        </>
      } />
      <Footer />
    </>
  )
}

function PageNotFound () {
  return (
    <>
      <PageHelmet
        title={'Page introuvable'}
        metaDescription={undefined}
        image={undefined}
      />
      <div className="text-center py-5">
        <h1
          style={{ fontSize: '40px' }}
          className="d-flex flex-row justify-content-center"
        >
          <div className="flex-column">
            <span style={{ fontSize: '50px' }}>404</span>
            <br />
            {'Cette page n\'existe pas'}
          </div>
        </h1>
      </div>
      <Footer />
    </>
  )
}


export default function App () {
  console.log('le console log fonctionne')
  return (
    <Routes>
      {/* <Route path="/" element={<Layout />}> */}
      <Route index element={<Home />} />
      <Route path="/404" element={<PageNotFound />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}