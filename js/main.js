const API_KEY = 'secret'

const testReading = () => {
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${API_KEY}/values/main!A1:A3?key=AIzaSyBce_WJ3Tm-OxbXJauBx-JOhJ93XjgrH38`)
    .then(res => {
      res.json().then(json => console.log('res', json))
    })
}

testReading()