document.addEventListener('DOMContentLoaded', function () {
  fetch('resources/sociologists.csv')
  .then(function (response) {
    response.text()
    .then (function (csv) {
      printSociologistsOnWP(csv)
    })
  })
})

// parses csv string into json and creates checkbox for each item on index.html
function printSociologistsOnWP (data) {
  const allSociologists = Papa.parse(data, { header: true }) // parses csv to json
  let faultylinescounter = 0

  const container = document.getElementById('list_for_mastodon') // ul element
  
  for (const sociologist of allSociologists.data) {
    if ('account' in sociologist && sociologist.account.trim() !== '') {
      const li = document.createElement('li')
      li.textContent = `${sociologist.account} (${sociologist.name})`
      container.appendChild(li)
    } else {
      faultylinescounter++
    }
  }

  //prints number of lines that could not correctly be rendered from the csv file it the log
  if (faultylinescounter > 1) {
    console.warn(faultylinescounter + " line(s) from csv not rendered (expected: 1)")
  }
}
