document.addEventListener("DOMContentLoaded", () => {
    let phoneInput = document.getElementById("input");
    let errorDiv = document.getElementById("error");
    let form = document.getElementById("signup-form");
    let submitBtn = document.getElementById("btn");

    if (!form || !phoneInput || !errorDiv || !submitBtn) {
      console.error("One or more elements are missing");
      return;
    }

    phoneInput.onblur = function () {
      if (phoneInput.value.length !== 10) {
        phoneInput.classList.add("invalid");
        errorDiv.innerText = "Phone Number must be 10 digits.";
        submitBtn.disabled = true;
      } else {
        submitBtn.disabled = false;
        errorDiv.innerText = "";
      }
    };

    phoneInput.onfocus = function () {
      if (this.classList.contains("invalid")) {
        this.classList.remove("invalid");
        errorDiv.innerHTML = "";
      }
    };

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const firstName = document.getElementById("first-name").value;
      const lastName = document.getElementById("last-name").value;
      const username = document.getElementById("username").value;
      const dob = document.getElementById("dob").value;
      const phone = phoneInput.value;
      const password = document.getElementById("password").value;

      const user = {
        firstName,
        lastName,
        username,
        dob,
        phone,
        password,
      };

      localStorage.setItem("userData", JSON.stringify(user));
      console.log(user);

      window.location.href = "login.html";
    });
  });
