const API_KEY = 'AIzaSyBce_WJ3Tm-OxbXJauBx-JOhJ93XjgrH38'
const spreadsheetId = '1L4mulEYdrYsD6xZ20NgS7vzxD7tK29joijHrVRK04JI'
const testReading = () => {
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/main!A1:A3?key=${API_KEY}`)
    .then(res => {
      res.json().then(json => console.log('res', json))
    })
}

// testReading()

const testWriting = () => {
  /*fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/main!A1:A3:append?key=${API_KEY}&valueInputOption=USER_ENTERED&insertDataOption=OVERWRITE`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      majorDimension: "ROWS",
      range:"main!A1:A3",
      values:['Test ecriture']
    }
  })
  .then(res => {
    res.json().then(json => console.log('res', json))
  })*/
}

testWriting()