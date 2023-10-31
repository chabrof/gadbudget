import React, { useEffect, useState } from 'react'
import { loadLastItems } from '../apiCalls/loadLastItems'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
const categories = [
  {
    label: 'boulangerie',
    value: 'boul'
  },
  {
    label: 'boucher',
    value: 'boucher',
  },
  {
    label: 'supermarché',
    value: 'supermarche'
  }
]
export function LastWritings () {
  const [list, setList] = useState([])

  /* useEffect(() => {
    loadLastItems().then((res) => {
      console.log('list', list)
      setList(res)
    })
  }, [])*/

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} size="small" aria-label="a dense table">
          {/*<TableHead>
          <TableRow>
            <TableCell align="left">Date</TableCell>
            <TableCell align="right">Prix</TableCell>
            <TableCell align="right">Catégorie</TableCell>
          </TableRow>
        </TableHead>*/}
          <TableBody>
            <TableRow
              key={-1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">
                <DatePicker slotProps={{ textField: { variant: 'standard' } }}/>
              </TableCell>

              <TableCell align="right">
                <TextField
                  label="Montant"
                  id="filled-start-adornment"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">€</InputAdornment>,
                  }}
                  variant="standard"
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  id="standard-select-categ"
                  select
                  label="Catégorie"
                  defaultValue="boul"
                  variant="standard"
                  sx={{ minWidth: 60 }}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

              </TableCell>
            </TableRow>
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
    </LocalizationProvider>
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
