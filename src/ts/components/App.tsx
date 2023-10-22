import React, { lazy, Suspense, useEffect } from 'react'
import '../scss/main.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import PageHelmet from './helmet/PageHelmet'
import { Footer } from './layouts/Footer'
import { Middle } from './layouts/Middle'
import { Header } from './layouts/Header'
import { AddButton, LastWritings } from './LastWritings'
import { signin } from '@wwwTs/apiCalls/googleAPILoading'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import '../../img/bg.webp'

/*
Middle content={
        <>
          <LastWritings />
          <AddButton />
        </>
      } />
      */
function Home () {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Header />
      <Box component="main" sx={{ p: 3, background: 'url(img/bg.webp)', backgroundSize: '100% auto', height: '100%'   }}>
        <Toolbar />
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
          fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
          aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
          cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem,
          at ab sequi qui modi delectus quia corrupti alias distinctio nostrum.
          Minima ex dolor modi inventore sapiente necessitatibus aliquam fuga et. Sed
          numquam quibusdam at officia sapiente porro maxime corrupti perspiciatis
          asperiores, exercitationem eius nostrum consequuntur iure aliquam itaque,
          assumenda et! Quibusdam temporibus beatae doloremque voluptatum doloribus
          soluta accusamus porro reprehenderit eos inventore facere, fugit, molestiae
          ab officiis illo voluptates recusandae. Vel dolor nobis eius, ratione atque
          soluta, aliquam fugit qui iste architecto perspiciatis. Nobis, voluptatem!
          Cumque, eligendi unde aliquid minus quis sit debitis obcaecati error,
          delectus quo eius exercitationem tempore. Delectus sapiente, provident
          corporis dolorum quibusdam aut beatae repellendus est labore quisquam
          praesentium repudiandae non vel laboriosam quo ab perferendis velit ipsa
          deleniti modi! Ipsam, illo quod. Nesciunt commodi nihil corrupti cum non
          fugiat praesentium doloremque architecto laborum aliquid. Quae, maxime
          recusandae? Eveniet dolore molestiae dicta blanditiis est expedita eius
          debitis cupiditate porro sed aspernatur quidem, repellat nihil quasi
          praesentium quia eos, quibusdam provident. Incidunt tempore vel placeat
          voluptate iure labore, repellendus beatae quia unde est aliquid dolor
          molestias libero. Reiciendis similique exercitationem consequatur, nobis
          placeat illo laudantium! Enim perferendis nulla soluta magni error,
          provident repellat similique cupiditate ipsam, et tempore cumque quod! Qui,
          iure suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
          Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore commodi
          reprehenderit rerum reiciendis! Quidem alias repudiandae eaque eveniet
          cumque nihil aliquam in expedita, impedit quas ipsum nesciunt ipsa ullam
          consequuntur dignissimos numquam at nisi porro a, quaerat rem repellendus.
          Voluptates perspiciatis, in pariatur impedit, nam facilis libero dolorem
          dolores sunt inventore perferendis, aut sapiente modi nesciunt.
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