import * as React from 'react'
import { Helmet } from 'react-helmet'

type PageHelmetProps = {
  title: string,
  metaDescription?: string,
  image?: string
}

const PageHelmet = ({ title, metaDescription = undefined }: PageHelmetProps) => {
  console.log('Helmet Title', title)
  return <Helmet>
    <title data-rh="true">{title}</title>
    <link rel="canonical" href={process.env.WWW_URL} />
    <meta name="robots" content="index,follow,all" />
    <meta name="identifier-url" content={process.env.WWW_URL} />
    <meta property="og:title" content={title} />
    {
      metaDescription &&
        <meta name="description" content={metaDescription} />
    }
    {
      metaDescription &&
        <meta property="og:description" content={metaDescription} />
    }
    <meta property="og:type" content="website" />
    <meta property="og:url" content={process.env.WWW_URL} />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:locale" content="fr_FR" />
    <meta property="dbep:www-version" content={process.env.WWW_VERSION} />
  </Helmet>
}

export default PageHelmet