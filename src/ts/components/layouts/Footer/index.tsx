import * as React from 'react'

export const Footer = () => {
  return (
    <footer className="page-footer font-small bg-light">
      <div>
        <div className="container-fluid">
          <div className="row d-flex align-items-center">
            <div className="col-md-7 col-lg-5 col-xl-4 text-center text-md-left  mb-md-0 small">
              <nav className="nav justify-content-center justify-content-md-start">
                <a className="nav-link text-muted" href="#">Terms of Privacy</a>
                <a className="nav-link text-muted" href="#">Cookies</a>
                <a className="nav-link text-muted" href="#">About</a>
                <a className="nav-link text-muted" href="#">Contact</a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
