
    let storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData && storedUserData.firstName) {
      
      let msg1=document.querySelector(".user1")
      msg1.innerText =  storedUserData.username ;
      
    }
 


