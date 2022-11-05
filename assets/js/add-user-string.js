function selectNewUserButton () { return document.getElementById('create_new_user_entry') }
function userEntryElement () { return document.getElementById('user-entry-form') }

document.addEventListener('DOMContentLoaded', function () {

  // Listen for click events on the buttons (if available on the page)
  const newUserButton = selectNewUserButton()
  if (newUserButton !== null) {
    newUserButton.addEventListener('click', createNewUserEntry)
  }
})

function createNewUserEntry() {
  // get values
  const create_entry_account = document.getElementById("account").value
  const create_entry_name = document.getElementById("name").value
  const create_entry_url = document.getElementById("url").value
  const create_entry_keyword1 = document.getElementById("keyword1").value.replace(" ", "_")
  const create_entry_keyword2 = document.getElementById("keyword2").value.replace(" ", "_")
  const create_entry_keyword3 = document.getElementById("keyword3").value.replace(" ", "_")
  const create_entry_language = document.getElementById("language").value

  // create user entry
  const new_user_entry = create_entry_account + "," + create_entry_name + "," + create_entry_url + "," + create_entry_keyword1 + " " + create_entry_keyword2 + " " + create_entry_keyword3 + "," + create_entry_language

  const container = document.createElement('div')
  container.textContent = new_user_entry
  const element = document.getElementById('created_user_entry')
  element.appendChild(container)
}
