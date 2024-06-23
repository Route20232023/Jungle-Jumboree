// http://junglejamboree.runasp.net/    Base Url

const fNameInput = document.getElementById("fNameInput");
const lNameInput = document.getElementById("lNameInput");
const emailInput = document.getElementById("emailInput");
const dateInput = document.getElementById("dateInput");
const passwordInput = document.getElementById("passwordInput");
const confPasswordInput = document.getElementById("confPasswordInput");
const addressInput = document.getElementById("addressInput");
const gender = document.getElementsByName("gender");
const registerForm = document.getElementById("registerForm");

//! alert inputs
let firstNameAlert = document.getElementById("firstNameAlert");
let secondNameAlert = document.getElementById("secondNameAlert");
let emailAlert = document.getElementById("emailAlert");
let addressAlert = document.getElementById("addressAlert");
let dateAlert = document.getElementById("dateAlert");
let genderAlert = document.getElementById("genderAlert");
let passwordAlert = document.getElementById("passwordAlert");
let confirmPasswordAlert = document.getElementById("confirmPasswordAlert");
//! alert inputs

function formatDateTime() {
  // Create a new Date object for the maximum value
  const maxDate = new Date();

  // Get the current date components
  const year = maxDate.getFullYear();
  const month = maxDate.getMonth() + 1; // Note: month is zero-based
  const day = maxDate.getDate();

  // Format the date as desired (adjust the format to your needs)
  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;

  // Use the formatted date as needed
  return formattedDate;
}
document.getElementById("dateInput").setAttribute("max", formatDateTime());

registerForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  let date = new Date(dateInput.value);
  console.log(dateInput.value);
  console.log(date.getFullYear());
  console.log(date.getMonth() + 1, "month");
  console.log(date.getDate());
  let selectedGender;
  for (const genderInput of gender) {
    if (genderInput.checked) {
      selectedGender = genderInput.value;
      break;
    }
  }
  console.log(selectedGender);

  let test = {
    address: addressInput.value,
    confirmPassword: confPasswordInput.value,
    dob: {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    },
    email: emailInput.value,
    fName: fNameInput.value,
    gender: +selectedGender,
    lname: lNameInput.value,
    password: passwordInput.value,
  };
  console.log(test);

  try {
    
    if (checkAllInputsAreValid() == true) {
      let res = await fetch(
        `https://junglejamboree.runasp.net/api/Account/Register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/plain",
          },
          body: JSON.stringify({
            address: addressInput.value,
            confirmPassword: confPasswordInput.value,
            dob: {
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate(),
            },
            email: emailInput.value,
            fName: fNameInput.value,
            gender: +selectedGender,
            lname: lNameInput.value,
            password: passwordInput.value,
          }),
        }
      );

      if (res.ok) {
        // Registration successful
        let data = await res.json();
        // Do something for a successful registration
        console.log(data);
        console.log("All done");
        resetForm(registerForm)
        Swal.fire({
          title: "Good job!",
          text: "Your are Successfully Registered , You Will be Redirect to login",
          icon: "success",
        });
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } else {
        // Registration failed
        let errorData = await res.json();
        console.log(errorData);
        console.log("not done");
        Swal.fire({
          title: "Somthing Went Wrong!",
          text: errorData.message,
          // errorData.message == "Email Already Exist"
          //   ? "Email Already Exist"
          //   : "All Inputs Is Required",
          icon: "error",
        });
      }
    }
   
  } catch (err) {
    console.log(err, "er");
  }

});

// na2s validation

function allValidationInputs(regex, element, alertMsg) {
  let pattern = regex;

  if (pattern.test(element.value) == true) {
    alertMsg.classList.replace("d-block", "d-none");
    
    return true;
  } else {
    alertMsg.classList.replace("d-none", "d-block");
    return false;
  }
}


function checkAllInputsAreValid() {
  if (
    allValidationInputs(/^[a-zA-Z]{2,}$/, fNameInput, firstNameAlert) &&
    allValidationInputs(/^[a-zA-Z]{2,}$/, lNameInput, secondNameAlert) &&
    allValidationInputs(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      emailInput,
      emailAlert
    ) &&
    allValidationInputs(/^.{4,}$/m, addressInput, addressAlert) &&
    isDateSelected() &&
    isGenderSelected() &&
    allValidationInputs(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{6,}).*$/,
      passwordInput,
      passwordAlert
    ) &&
    checkIfPasswordMatch()
  ) {
    console.log("all are valid");
    return true;
  } else {
    console.log("all are not valid");
    return false;
  }
}

function isDateSelected() {
  const selectedDate = document.getElementById("dateInput").value;
  if (!selectedDate) {
    // Date is not selected
    console.log("date is not selected");
    dateAlert.classList.replace("d-none", "d-block");
    return false;
  } else {
    // Date is selected
    console.log("date selected");
    dateAlert.classList.replace("d-block", "d-none");
    return true;
  }
}

function isGenderSelected() {
  const genderOptions = document.getElementsByName("gender");
  for (let i = 0; i < genderOptions.length; i++) {
    if (genderOptions[i].checked) {
      // Gender is selected
      console.log("gender is selected");
      genderAlert.classList.replace("d-block", "d-none");
      return true;
    }
  }
  // Gender is not selected
  console.log("gender is not selected");
  genderAlert.classList.replace("d-none", "d-block");
  return false;
}


function checkIfPasswordMatch() {
  if (passwordInput.value == confPasswordInput.value) {
    console.log("match");
    confirmPasswordAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    console.log("not match");
    confirmPasswordAlert.classList.replace("d-none", "d-block");
    return false;
  }
}


function resetForm(form) {
  const inputs = form.querySelectorAll('input');
  const textareas = form.querySelectorAll('textarea');
  const selects = form.querySelectorAll('select');

  inputs.forEach(input => {
    if (input.type !== 'submit' && input.type !== 'button' && input.type !== 'hidden') {
      if (input.type === 'file') {
        // Create a new file input element
        const newInput = document.createElement('input');
        newInput.type = 'file';
        newInput.name = input.name;

        // Replace the existing file input with the new one
        input.parentNode.replaceChild(newInput, input);
      } else if (input.type === 'radio') {
        input.checked = false; // Uncheck the radio button
      } else {
        input.value = '';
      }
    }
  });

  textareas.forEach(textarea => {
    textarea.value = '';
  });

  selects.forEach(select => {
    select.value = '';
  });
}