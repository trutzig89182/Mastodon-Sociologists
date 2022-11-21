// CONSTANTS/CONFIG

// The filename that will be suggested for the users when downloading
const CSV_DOWNLOAD_NAME = 'my_account_list.csv'

// These functions return element(s) from the page. We put them here at the top
// so that we can change the IDs if necessary
function selectAllUsersButton () { return document.getElementById('select-all-users') }
function selectNoneUsersButton () { return document.getElementById('select-none-users') }
function completeCSVButton () { return document.getElementById('get-complete-csv') }
function generateCSVButton () { return document.getElementById('generate-csv') }
function allCheckboxes () { return document.querySelectorAll('input[name="selected_users"]') }
function userListWrapper () { return document.getElementById('user-list') }
function formElement () { return document.getElementById('main-form') }

// ON LOAD ENTRY POINT
document.addEventListener('DOMContentLoaded', function () {
  // As soon as the webpage is loaded, infuse the dynamic functionality

  // Listen for click events on the buttons (if available on the page)
  const selAllButton = selectAllUsersButton()
  if (selAllButton !== null) {
    selAllButton.addEventListener('click', selectAllUsers)
  }

  const selNoneButton = selectNoneUsersButton()
  if (selNoneButton !== null) {
    selNoneButton.addEventListener('click', selectNoneUsers)
  }

  const completeButton = completeCSVButton()
  if (completeButton !== null) {
    completeButton.addEventListener('click', createFullCSV)
  }

  const generateButton = generateCSVButton()
  if (generateButton !== null) {
    generateButton.addEventListener('click', generateCSV)
  }

  // Now, determine which list we need to build. There are two files available,
  // one that simply spits out a list of account names, and another one that
  // builds a form for people to select users. We can determine which of the
  // functions we need to call by looking at the available elements on the page.
  getCSVData()
  .then(function (data) {
    if (formElement() !== null) {
      // We're on the form page
      const no_selector = "" // sets empty selector. Will be re-set if keyword is clicked
      buildUserSelectionForm(data, no_selector)
    } else {
      // We're on the tootformat page
      buildSimpleList(data)
    }
  })
})

/**
 * Fetches the users.csv file from the server and returns the parsed CSV data
 *
 * @return  {Array<{ account: string, link: string, name: string }>}  A multi-dimensional array containing the parsed CSV file contents.
 */
async function getCSVData () {
  // Fetch the CSV file
  const response = await fetch('resources/users.csv')
  // Retrieve the file contents as plain text
  const data = await response.text()
  // Parse them into a multi-dimensional array of objects. In our case:
  // Array<{ account: string, link?: string, name: string }>
  const parsedData = Papa.parse(data, { header: true })

  return parsedData.data.filter(function (user) {
    // In this last filter, we remove invalid users.
    const isValid = ('account' in user) && user.account.trim() !== ''
    if (!isValid) {
      console.error('Invalid line in CSV:', user)
    }
    return isValid
  })
}

/**
 * Selects all checkboxes on the page
 */
function selectAllUsers () {
  for (const checkbox of allCheckboxes()) {
    checkbox.checked = true
  }
}

/**
* Deselects all checkboxes on the page
*/
function selectNoneUsers () {
  for (const checkbox of allCheckboxes()) {
    checkbox.checked = false
  }
}

/**
 * Small utility function that generates a CSV for all users automatically
 */
function createFullCSV () {
  selectAllUsers()
  generateCSV()
}


/**
 * Builds a form from the CSV data for people to select accounts
 *
 * @param   {Array<{ account: string, name: string, link: string, keywords: string }>}  users  The parsed CSV data
 */
function buildUserSelectionForm (users) {
  const container = userListWrapper()

  if (container === null) {
   console.error('Could not build user selection form: Cannot find wrapper.')
   return
  }

  for (const user of users) {

    // Structure:
    // <div class="input-list-item">
    //   <input name="selected_users" value="user.account" id="user.account">
    //   <label for="user.account">Account</label>
    //   <a href="link">(name)</a>
    //   – Keywords: (keywords)
    // </div>

   const wrapper = document.createElement('div')
   //sets created checkbox item to visible. Will be set to 'none' later if a keyword is selected that is not part of this item
   wrapper.classList.add('input-list-item')
   wrapper.setAttribute('style', 'display: normal;')

   const input = document.createElement('input')
   input.value = user.account
   input.type = 'checkbox'
   input.name = 'selected_users'
   input.setAttribute('id', user.account)

   wrapper.appendChild(input)

   const label = document.createElement('label')
   label.setAttribute('for', user.account)
   label.textContent = user.account

   wrapper.appendChild(label)

   // Name as clickable link to profile
   const bracketOpen = document.createTextNode(" (")
   const bracketClose = document.createTextNode(") ")
   wrapper.appendChild(bracketOpen)
   if ('link' in user && user.link.trim() !== '') {
     const nameAsLink = document.createElement('a')
     nameAsLink.textContent = user.name
     nameAsLink.setAttribute('href', user.link)
     nameAsLink.setAttribute('target', 'blank')
     wrapper.appendChild(nameAsLink)
   } else {
     const nameWithoutLink = document.createTextNode(user.name)
     wrapper.appendChild(nameWithoutLink)
     console.error('Profile URL for ' + user.name + ' is missing.')
   }
   wrapper.appendChild(bracketClose)



   /*
    * Checks if user has a keyword string and seperates it into an
    + array with seperate keywords if that is the case
    */
    if (typeof user.keywords !== 'undefined' && user.keywords !== null && user.keywords.trim() !== '') {
     const keywordSeperator = document.createTextNode(" – Keywords: ")
     wrapper.appendChild(keywordSeperator)
     //const keywordstring = user.keywords.replaceAll(" ", ", ").replaceAll("_", " ")
     const keywordArray = user.keywords.split(" ")


     // append keywords as <a> elements and seperate them by a comma
     for (i in keywordArray) {
       if (i > 0) {
         const commaSeperator = document.createTextNode(', ')
         wrapper.appendChild(commaSeperator)
       }
       const keyword_item = document.createElement('a')
       keyword_item.textContent = keywordArray[i].replaceAll("_", " ").toLowerCase()
       keyword_item.setAttribute('selected', false)
       console.log('create new attribute selected = false for keyword')
       keyword_item.setAttribute('name', keywordArray[i].toLowerCase())
       keyword_item.setAttribute('onclick', 'selectedKeyword(this)')
       keyword_item.setAttribute('class', 'keywordclass')
       wrapper.appendChild(keyword_item)
     }

    }
    // appends this accounts checkboxlist item to the form
    container.appendChild(wrapper)
  }
}


/**
 * This function actually generates the CSV file with the selected users.
 */
function generateCSV () {
  // First, retrieve all account names (the checkbox values)
  const values = []
  for (const checkbox of allCheckboxes()) {
    if (checkbox.checked) {
      values.push(checkbox.value)
    }
  }

  // We'll again use the Papa library to convert from our JS data back to valid
  // CSV data.
  const csvData = Papa.unparse({
    // Two Columns
    fields: ['Account address', 'Show boosts'],
    // Convert account names to [ account, true ]
    data: values.map(function (val) { return [ val, true ] })
  })

  // The file will be served as a data string, so don't forget the header
  const csvFile = "data:text/csv;charset=utf-8," + csvData
  const encodedUri = encodeURI(csvFile)

  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', CSV_DOWNLOAD_NAME) // Suggested filename in the download prompt
  document.body.appendChild(link) // Required for Firefox
  link.click() // This will download the data file named `CSV_DOWNLOAD_NAME`.

  setTimeout(function () { link.parentElement.removeChild(link) }, 60_000) // After a minute, clean up the link
}

/**
 * Displays a simple copy-and-paste list from the CSV data
 *
 * @param   {Array<{ account: string, name: string, link: string, keywords: string, language: string}>}  users  The parsed CSV data
 */
function buildSimpleList (users) {
  const container = userListWrapper() // ul element
  for (const user of users) {
    const li = document.createElement('li')
    li.textContent = `${user.account} (${user.name})`
    container.appendChild(li)
  }
}


/**
 * checks if keyword clicked is already selected and refers to filterByKeyword() or undoFiler() based on this.
 */
function selectedKeyword (keywordElement) {
  if (keywordElement.getAttribute('selected') == 'true') {
    undoFilter('normal')
  } else if (keywordElement.getAttribute('selected') == 'false') {
    filterByKeyword(keywordElement)
  } else {
    const thisKeywordsCheckboxElement = keywordElement.parentElement.firstChild.id
  }

}


// makes entries without selected keyword invisible
function filterByKeyword (keywordElement) {
  const this_keyword = keywordElement.name.toLowerCase()
  const checkboxListElements = document.getElementsByClassName('input-list-item')
  const allKeywordElements = document.getElementsByClassName('keywordclass')

  // sets all elements to not selected and invisible before making only selected elements visible
  for (var i = 0; i < checkboxListElements.length; i++) {
    //console.log('set to invisible')
    checkboxListElements.item(i).style.display = 'none' //setAttribute('style', 'diplay: none;')
    //console.log(checkboxListElements.item(i).getAttribute('style'))
  }

  // setzt alle keyword.selected auf false (um dann nur die keywords, die dem aktuellen entsprechen auf true zu setzen.)
  for (var i = 0; i < allKeywordElements.length; i++) {
    allKeywordElements.item(i).setAttribute('selected', false)
  }

  for (var i = 0; i < allKeywordElements.length; i++) {
    if (allKeywordElements.item(i).name.toLowerCase() == this_keyword) { // looks for keyword in entire entry. could be more precise in looking at keyword
      allKeywordElements.item(i).parentElement.setAttribute('style', 'display: normal;')//setAttribute('style', 'diplay: normal;')
      allKeywordElements.item(i).setAttribute('selected', true) //setAttribute('selected', true)
      console.log('set selected attribute of current keyword to true:', allKeywordElements.item(i).getAttribute('selected'))
    }
  }
}

// sets all entries to visible and all keyword’s selected attribute to false
function undoFilter () {
  const checkboxListElements = document.getElementsByClassName('input-list-item')
  const allKeywordElements = document.getElementsByClassName('keywordclass')
  for (var i = 0; i < checkboxListElements.length; i++) {
    checkboxListElements.item(i).setAttribute('style', 'display: normal;')
  }
  for (var i = 0; i < allKeywordElements.length; i++) {
    allKeywordElements.item(i).setAttribute('selected', false)
  }
}
