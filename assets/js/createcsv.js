document.addEventListener('DOMContentLoaded', function () {
  fetch('resources/sociologists.csv')
  .then(function (response) {
    response.text().then (function (csv) {
      printSociologistsOnWP(csv)
    })
  })

  // Add event listeners
  document.getElementById("all_button").addEventListener("click", selectAll)
  document.getElementById("none_button").addEventListener("click", selectNone)
  document.getElementById("selected_button").addEventListener("click", createSelectedCsv)
})

// parses csv string into json and creates checkbox for each item on index.html
function printSociologistsOnWP(data) {
  const sociologists = Papa.parse(data, { header: true }) // parses csv to json
  let faultylinescounter = 0

  const container = document.getElementById("sociologists_list")

  for (const sociologist of sociologists.data) {
    if (!('account' in sociologist) || sociologist.account.trim() === '') {
      faultylinescounter++
      continue
    }

    // Structure:
    // <div class="input-list-item">
    //   <input name="selected_sociologists" value="sociologist.account" id="sociologist.account">
    //   <label for="sociologist.account">Account (name)</label>
    //   <a href="link">Link (without https)</a>
    // </div>

    const wrapper = document.createElement('div')
    wrapper.classList.add('input-list-item')

    const input = document.createElement('input')
    input.value = sociologist.account
    input.type = 'checkbox'
    input.name = "selected_sociologists"
    input.setAttribute('id', sociologist.account)

    wrapper.appendChild(input)

    const label = document.createElement('label')
    label.setAttribute('for', sociologist.account)
    label.textContent = `${sociologist.account} (${sociologist.name}) `

    wrapper.appendChild(label)

    if ('link' in sociologist && sociologist.link.trim() !== '') {
      const profileLink = document.createElement('a')
      profileLink.textContent = sociologist.link.replace('https://', '')
      profileLink.setAttribute('href', sociologist.link)
      profileLink.setAttribute('target', '_blank')
      wrapper.appendChild(profileLink)
    }

    container.appendChild(wrapper)
  }

  if (faultylinescounter > 1) {
    console.warn(faultylinescounter + " line(s) from csv not rendered (expected value: 1)")
  }
}


/**
 * Selects all checkboxes on the page
 */
function selectAll () {
    for (const checkbox of document.getElementsByName('selected_sociologists')) {
      checkbox.checked = true
    }
}

/**
 * Deselects all checkboxes on the page
 */
function selectNone () {
  for (const checkbox of document.getElementsByName('selected_sociologists')) {
    checkbox.checked = false
  }
}

function createSelectedCsv() {
    // get checked accounts from checkboxes
    const checkboxes = document.querySelectorAll('input[name="selected_sociologists"]')
    const values = []
    // looping through all checkboxes
    // if checked property is true then push
    for (const checkbox of document.querySelectorAll('input[name="selected_sociologists"]')) {
      if (checkbox.checked) {
        values.push(checkbox.value)
      }
    }


    //create array with collected values
    const csvFileData = [
      ["Account address", "Show boosts"]
    ]
    for (const val of values) {
      csvFileData.push([val, true])
    }




    // define header for csv
    //var csvFile = "Account address,Show boosts\n";

    // merge data from array to csv
    const csvFile = "data:text/csv;charset=utf-8,"
    + csvFileData.map(e => e.join(",")).join("\n")

    var encodedUri = encodeURI(csvFile)
    var link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "my_mastodon_sociologists.csv")
    document.body.appendChild(link) // Required for FF

    link.click() // This will download the data file named "my_mastodon_sociologists.csv".

}

function createAllCsv () {
  selectAll()
  createSelectedCsv()
}
