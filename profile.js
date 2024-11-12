
let storedUserData = JSON.parse(localStorage.getItem("userData"));

  let msg1=document.querySelector("#user2")
  msg1.innerText =  storedUserData.username ;
  



