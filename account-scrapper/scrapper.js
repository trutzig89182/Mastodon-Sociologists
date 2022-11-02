document.getElementById("get_data").addEventListener("click", getBio);


// function loadDoc() {
// const xhttp = new XMLHttpRequest();
// xhttp.onload = function() {
//   document.getElementById("demo").innerHTML = this.responseText;
//   }
// xhttp.open("GET", "ajax_info.txt", true);
// xhttp.send();
// }

// var elements = document.getElementsByClassName("account__header__content emojify);

//
// function getAcount() {
//   var url = document.getElementById("account_url").value;
//
//   console.log("url");
//
//   //$.ajax({ url: url, success: function(data) { alert(data); } });
//
//   htmlpage = data;
//
//   account = htmlpage.getElementByClassName("display-name__account").textContent
//   console.log("account");
//   display_name = htmlpage.getElementByClassName("display-name__html").textContent;
//   console.log("display_name");
//   account_url = url;
//   console.log("account-url");
//
//   document.getElementById("result").innerHTML = (account + "," + display_name + "," + accounturl);
//
//
// }

function getBio() {
  account_url = document.getElementById("account_url");
  $.ajax({ url: "https://berlin.social/@AlexMitterle", success: function(data) {
    var short_bio = data.getElementByClassName("account__header__content emojify").innerHTML;
    document.getElementById("result").innerHTML = short_bio;
  } });
}
