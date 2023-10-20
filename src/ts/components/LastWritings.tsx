import React, { useEffect, useState } from 'react'
import { loadLastItems } from '../apiCalls/loadLastItems'

export const LastWritings = () => {

  const [list, setList] = useState([])
  useEffect(() => {
    loadLastItems().then((res) => setList(res))
  }, [])

  return (
    <table className="table">
      <tbody>
        {
          list.map((item, idx) =>
            <tr key={idx}>
              <th scope="row">{item[0]}</th>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
            </tr>
          )
        }
      </tbody>
    </table>
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
