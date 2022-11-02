document.addEventListener('DOMContentLoaded', function () {
  fetch('resources/users.csv')
  .then(function (response) {
    response.text()
    .then (function (csv) {
      printUsersOnWP(csv)
    })
  })
})

// parses csv string into json and creates checkbox for each item on index.html
function printUsersOnWP (data) {
  const allUsers = Papa.parse(data, { header: true }) // parses csv to json
  let faultylinescounter = 0

  const container = document.getElementById('list_for_mastodon') // ul element

  for (const user of allUsers.data) {
    if ('account' in user && user.account.trim() !== '') {
      const li = document.createElement('li')
      li.textContent = `${user.account} (${user.name})`
      container.appendChild(li)
    } else {
      faultylinescounter++
    }
  }

  //prints number of lines that could not correctly be rendered from the csv file it the log
  if (faultylinescoUserr > 1) {
    console.warn(faultylinescounter + " line(s) from csv not rendered (expected: 1)")
  }
}
