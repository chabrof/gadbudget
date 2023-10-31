import React from 'react'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

type Props = {
  title?: string,
  message?: string,
  link?: string
}

export const Error = ({ title = 'Erreur', message = undefined, link = undefined }: Props) => {
  return (
    <Alert severity="error" className="mb-0">
      <AlertTitle>{title ? title : 'Erreur'}</AlertTitle>
      <Typography dangerouslySetInnerHTML={{ __html: message || '' }} />
      {link && <Link href={link}>Retour</Link>} {/* ReactRouter "Link" doesnt work */}
    </Alert>
  )
}
