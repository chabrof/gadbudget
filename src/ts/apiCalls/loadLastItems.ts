
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


export const createSheet  = () => {
  try {
    return (gapi.client as any).sheets.spreadsheets.batchUpdate({
      spreadsheetId: '1L4mulEYdrYsD6xZ20NgS7vzxD7tK29joijHrVRK04JI',
      requestBody: {
        requests: [{
          addSheet: {
            properties: {
              title: 'newTab',
            }
          }
        }]
      }
    }).then((response) => {
      const result = response.result
    })
  } catch (err) {
    console.error('err', err)
    return
  }
  console.log('la')
}