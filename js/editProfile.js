// {
//     "fName": "abdullah",
//     "lname": "mohamed",
//     "gender": 1,
//     "address": "helwan",
//     "dob": {
//       "year": 2002,
//       "month": 9,
//       "day": 22
//     },
//     "oldPassword": "Ahmed@1234",
//     "password": "Reda@1234",
//     "confirmPassword": "Reda@1234"
//   }

// http://junglejamboree.runasp.net/    Base Url

const fNameInput = document.getElementById("fNameInput");
const lNameInput = document.getElementById("lNameInput");
const emailInput = document.getElementById("emailInput");
const dateInput = document.getElementById("dateInput");
const passwordInput = document.getElementById("passwordInput");
const confPasswordInput = document.getElementById("confPasswordInput");
const oldPasswordInput = document.getElementById("oldPasswordInput");
const addressInput = document.getElementById("addressInput");
const gender = document.getElementsByName("gender");
const editProfileForm = document.getElementById("editProfileForm");

//! alert inputs
const firstNameAlert = document.getElementById("firstNameAlert");
const secondNameAlert = document.getElementById("secondNameAlert");
const emailAlert = document.getElementById("emailAlert");
const addressAlert = document.getElementById("addressAlert");
const dateAlert = document.getElementById("dateAlert");
const genderAlert = document.getElementById("genderAlert");
const oldPasswordAlert = document.getElementById("oldPasswordAlert");
const passwordAlert = document.getElementById("passwordAlert");
const confirmPasswordAlert = document.getElementById("confirmPasswordAlert");
//! alert inputs

editProfileForm.addEventListener("submit", async function (e) {
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

  let userEditedData = {
    address: addressInput.value,
    confirmPassword: confPasswordInput.value,
    dob: {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    },
    fName: fNameInput.value,
    gender: +selectedGender,
    lname: lNameInput.value,
    password: passwordInput.value,
    oldPassword: oldPasswordInput.value,
  };
  console.log(userEditedData);

  try {
    if (checkAllInputsAreValid() == true) {
      let res = await fetch(
        `https://junglejamboree.runasp.net/api/Account/UpdateUserInfo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          body: JSON.stringify(userEditedData),
        }
      );
      if (res.ok) {
        // Registration successful
        let data = await res.json();
        // Do something for a successful registration
        console.log(data);
        console.log("All done");
        resetForm(editProfileForm)
        setTimeout(function () {
          window.location.href = "./profile.html";
        }, 2000);
      } else {
        // Registration failed
        let errorData = await res.json();
        console.log(errorData);
        console.log("not done");
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
    isGenderSelected() &&
    allValidationInputs(/^.{4,}$/m, addressInput, addressAlert) &&
    isDateSelected() &&
    allValidationInputs(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{6,}).*$/,
      oldPasswordInput,
      oldPasswordAlert
    ) &&
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


// clear form all
function resetForm(form) {
  const inputs = form.querySelectorAll('input');
  const textareas = form.querySelectorAll('textarea');
  const selects = form.querySelectorAll('select');

  inputs.forEach(input => {
    if (input.type !== 'submit' && input.type !== 'button' && input.type !== 'hidden') {
      input.value = '';
    }
  });

  textareas.forEach(textarea => {
    textarea.value = '';
  });
  selects.forEach(select => {
    select.value = '';
  });
}
// clear form all
