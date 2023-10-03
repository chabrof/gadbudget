import * as React from 'react'

export const List = () => {
  return (
    <table className="table">
      <tbody>
        <tr>
          <th scope="row">jeu 24 jul.</th>
          <td>Boucher</td>
          <td>24 €</td>
        </tr>
        <tr>
          <th scope="row">sam 28 sep.</th>
          <td>Courses</td>
          <td>242 €</td>
        </tr>
        <tr>
          <th scope="row">lun. 2 oct.</th>
          <td>Courses</td>
          <td>123,40 €</td>
        </tr>
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
