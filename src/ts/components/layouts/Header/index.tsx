import * as React from 'react'

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Gad'Budget</a>
        <button
          className="navbar-toggler" type="button"
          data-toggle="collapse" data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto ">
            { /*<li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle " href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
                    EN
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li>
                      <h6 className="dropdown-header">Language</h6>
                    </li>
                    <li><a className="dropdown-item" href="#">SP</a></li>
                    <li><a className="dropdown-item" href="#">FR</a></li>
                    <li><a className="dropdown-item" href="#">DE</a></li>
                  </ul>
                </li> */
            }
            <li className="nav-item">
              <a className="nav-link active" href="#">Saisie</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Visualisation</a>
            </li>
            <li className="nav-item dropdown ml-lg-3 ">
              <a
                className="nav-link dropdown-toggle text-light d-inline-block bg-orange rounded p-1 p-lg-2"
                href="#" id="navbarDropdownMenuLink" role="button"
                data-toggle="dropdown" aria-expanded="false">
                <i className="fab fa-facebook-f white-text mx-2"> </i>
              </a>
              <ul className="dropdown-menu dropdown-menu-lg-right p-1 sign__container" aria-labelledby="navbarDropdownMenuLink">
                <h1 className="h4 mb-3 font-weight-normal text-center">Please sign in</h1>
                <label htmlFor="inputSheetId" className="sr-only">Google sheet id</label>
                <input type="email" id="sheetId" className="form-control" placeholder="sheet id" />
                <button className="btn btn-sm btn-outline-primary mt-2" type="submit">Enregistrer</button>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
