import * as React from 'react'

type MiddleProps = {
  content: any
}

export const Middle = ({ content }: MiddleProps) => {
  return (
    <main className="container-fluid cover  ">
      <div className="row align-items-center justify-content-center justify-content-xl-start vh-80">
        <div className="col col-sm-7 text-center text-xl-left col-xl-4 offset-xl-2">
          <h1 className="mb-4">{ 'Gad\' Budget' }</h1>
          <div className="input-group mb-3 shadow">
            {content}
          </div>
          {/*
          <form className="d-flex shadow">
            <input className="form-control " type="search" placeholder="Enter delivery address" aria-label="Search">

            <button className="btn bg-orange  text-white ml-3 text-uppercase " type="submit">Find Food</button>
          </form> -->
          */}
        </div>
      </div>
    </main>
  )
}