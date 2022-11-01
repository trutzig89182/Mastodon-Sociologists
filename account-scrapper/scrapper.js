document.getElementById("account_url").addEventListener("click", getAcount);


function loadDoc() {
const xhttp = new XMLHttpRequest();
xhttp.onload = function() {
  document.getElementById("demo").innerHTML = this.responseText;
  }
xhttp.open("GET", "ajax_info.txt", true);
xhttp.send();
}


function getAcount() {
  var url = document.getElementById("account_url").value;

  console.log("url");

  //$.ajax({ url: url, success: function(data) { alert(data); } });

  htmlpage = data;

  account = htmlpage.getElementByClassName("display-name__account").textContent
  console.log("account");
  display_name = htmlpage.getElementByClassName("display-name__html").textContent;
  console.log("display_name");
  account_url = url;
  console.log("account-url");

  document.getElementById("result").innerHTML = (account + "," + display_name + "," + accounturl);


}
