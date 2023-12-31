export const loadLastItems = async (): Promise<any[]> => {
  let response
  try {
    // Fetch first 10 files
    response = await (gapi.client as any).sheets.spreadsheets.values.get({
      spreadsheetId: '1L4mulEYdrYsD6xZ20NgS7vzxD7tK29joijHrVRK04JI',
      range: 'main!A2:C2',
    })
  } catch (err) {
    console.error(err)
    return
  }
  const range = response.result
  if (!range || !range.values || range.values.length == 0) {
    console.log('No values found.')
    return
  }
  console.log('out', range)
  return range.values
}
let sheetH
export const getSpshInfos = async (): Promise<any[]> => {
  let response
  try {
    // Fetch first 10 files
    response = await (gapi.client as any).sheets.spreadsheets.get({
      spreadsheetId: '1L4mulEYdrYsD6xZ20NgS7vzxD7tK29joijHrVRK04JI',
    })
  } catch (err) {
    console.error(err)
    return
  }
  const result = response.result

  sheetH = result.sheets.reduce((acc, sheet) => {
    acc[sheet.properties.title] = sheet
    return acc
  }, {})
  console.log('Spsh details', result)
  return result
}

export const appendLine = async (): Promise<any[]> => {
  let response
  try {
    response = await (gapi.client as any).sheets.spreadsheets.values.append({
      spreadsheetId: '1L4mulEYdrYsD6xZ20NgS7vzxD7tK29joijHrVRK04JI',
      majorDimension: 'ROWS',
      valueInputOption: 'USER_ENTERED',
      range: 'main!A2:C2',
      values: [['13/02/2023', '13,23 €', 'Boulangerie2']]
    })
  } catch (err) {
    console.error(err)
    return
  }
  const range = response.result
  if (!range || !range.values || range.values.length == 0) {
    console.log('No values found.')
    return
  }
  console.log('out', range)
  return range.values
}


export const writeTest = () => {
  try {
    console.log('ici')
    return (gapi.client as any).sheets.spreadsheets.values.update({
      spreadsheetId: '1L4mulEYdrYsD6xZ20NgS7vzxD7tK29joijHrVRK04JI',
      range: 'main!A2:C2',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [['12/02/2023', '12,23 €', 'Boulangerie']],
      },
    }).then((response) => {
      const result = response.result
      console.log(`${result.updatedCells} cells updated.`)
    })
  } catch (err) {
    console.error('erreir', err)
    return
  }
  console.log('la')
}

export const createSheet  = () =>
  (gapi.client as any).sheets.spreadsheets.batchUpdate({
    spreadsheetId: '1L4mulEYdrYsD6xZ20NgS7vzxD7tK29joijHrVRK04JI',
    resource: {
      requests: [{
        addSheet: {
          properties: {
            title: 'newTab',
          }
        }
      }]
    }
  })
    .then((response) => {
      const result = response.result.result
    })
    .catch(e => {
      console.error('catche e', e)
      const { status } = e
      switch(status) {
        case 400:
          console.error('Erreur lors de la creation de la tab')
          break
      }
    })

export const deleteLine  = () =>{
  const sheetDscr = sheetH['main']

  return (gapi.client as any).sheets.spreadsheets
    .batchUpdate({
      spreadsheetId: '1L4mulEYdrYsD6xZ20NgS7vzxD7tK29joijHrVRK04JI',
      resource: {
        requests: [{
          deleteDimension: {
            'range': {
              'sheetId': sheetDscr['sheetId'],
              'dimension': 'ROWS',
              'startIndex': 5,
              'endIndex': 15
            }
          }
        }]
      }
    })
    .then((response) => {
      const result = response.result.result
    })
    .catch(e => {
      console.error('catche e', e)
      const { status } = e
      switch(status) {
        case 400:
          console.error('Erreur lors de la creation de la tab')
          break
      }
    })
}

export const getSheetIdWithName = () =>
  (gapi.client as any).sheets.spreadsheets
    .getSheets()
