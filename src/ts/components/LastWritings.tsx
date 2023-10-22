import React, { useEffect, useState } from 'react'
import { loadLastItems } from '../apiCalls/loadLastItems'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

export function LastWritings () {
  const [list, setList] = useState([])
  useEffect(() => {
    loadLastItems().then((res) => setList(res))
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Date</TableCell>
            <TableCell align="right">Prix</TableCell>
            <TableCell align="right">Catégorie</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row[0]}</TableCell>
              <TableCell align="right">{row[1]}</TableCell>
              <TableCell align="right">{row[2]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export const AddButton = () => {
  return (
    <>
      <input type="text" className="form-control" placeholder="Enter delivery address" aria-label="Search" aria-describedby="basic-addon1" />
      <div className="input-group-prepend">
        <button className="btn bg-orange text-light text-uppercase p-3" type="button">Ajouter</button>
      </div>
    </>
  )
}
