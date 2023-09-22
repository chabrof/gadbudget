
const testReading = () => {
  fetch('https://sheets.googleapis.com/v4/spreadsheets/1L4mulEYdrYsD6xZ20NgS7vzxD7tK29joijHrVRK04JI/values/main!A1:A3?key=AIzaSyBce_WJ3Tm-OxbXJauBx-JOhJ93XjgrH38')
    .then(res => {
      res.json().then(json => console.log('res', json))
    })
}

testReading()