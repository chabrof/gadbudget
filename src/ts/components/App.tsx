import React, { lazy, Suspense, useEffect } from 'react'
import '../scss/main.scss'
import PageHelmet from './helmet/PageHelmet'
import { Footer } from './layouts/Footer'
import Container from '@mui/material/Container'
import { Middle } from './layouts/Middle'
import { Header } from './layouts/Header'
import { AddButton, LastWritings } from './LastWritings'
import { signin } from '@wwwTs/apiCalls/googleAPILoading'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import '../../img/bg.webp'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { GoogleConnectBox } from '@wwwTs/components/GoogleConnectBox'
import MainLayout from '@wwwTs/components/layouts/MainLayout'
import { Error } from './ErrorCpt'

function Home () {
  return (
    <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
      <Header />
      <Box component="main" sx={{ p: 3, background: 'url(img/bg.webp)', backgroundSize: 'cover', width: '100%', height: '100%' }}>
        <Toolbar />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4, pl: 0, pr: 0 }}>
          <LastWritings />
        </Container>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
          fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
          aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in.
        </Typography>
      </Box>
    </Box>
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout header={<Header />} footer={<Footer />} ErrorCpt={Error} />}>
      <Route index element={<Home />} />
      <Route path="connexion" element={<GoogleConnectBox />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
)

export default function App () {
  return <RouterProvider router={router} />
}
