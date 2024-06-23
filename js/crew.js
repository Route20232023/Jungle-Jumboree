//! crew Inpts
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");
const dateCrewInput = document.getElementById("dateCrewInput");
const addressInput = document.getElementById("addressInput");
//! crew Inpts

//! crew Inpts Alerts
const nameInputAlert = document.getElementById("nameInputAlert");
const emailInputAlert = document.getElementById("emailInputAlert");
const phoneInputAlert = document.getElementById("phoneInputAlert");
const dateCrewInputAlert = document.getElementById("dateCrewInputAlert");
const addressInputAlert = document.getElementById("addressInputAlert");
const pictureInputAlert = document.getElementById("pictureInputAlert");
const cvInputAlert = document.getElementById("cvInputAlert");
const genderInputAlert = document.getElementById("genderInputAlert");
//! crew Inpts Alerts

const crewForm = document.getElementById("crewForm");
document
  .getElementById("crewForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    // Extract and set date fields
    const dob = new Date(formData.get("date"));
    formData.delete("date");
    formData.append("DOB.Year", +dob.getFullYear());
    formData.append("DOB.Month", +dob.getMonth() + 1); // Months are 0-based
    formData.append("DOB.Day", +dob.getDate());

    // Add other necessary fields
    formData.append("PictureUrl", "");
    formData.append("CVUrl", "");

    // Ensure correct field names for files
    formData.set("CV", formData.get("CV"));
    formData.set("Picture", formData.get("Picture"));

    // Handle Gender field naming consistency
    if (!formData.get("Gender")) {
      formData.append("Gender", +formData.get("gender"));
    }

    // Log the formData keys and values for debugging
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    if(localStorage.getItem('userToken')){
      if (checkIfAllCrewInputsAreValid()) {
        try {
          document.querySelector('.loader').classList.replace('d-none','d-flex')
          console.log('calling api');
          let res = await fetch(
            `https://junglejamboree.runasp.net/api/NewStaff/ApplyNewStaff`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
              },
              body: formData,
            }
          );
  
            let data = await res.json();
            console.log(data);
            console.log("All done");
            resetForm(crewForm)
            Swal.fire({
              title: "Good job!",
              text: `${data.message}`,
              icon: "success",
            });
          
        } catch (err) {
          console.log(err);
          Swal.fire({
            title: "You Are Not Authorized",
            text: `You Must Log In First`,
            icon: "error",
          });
        }finally{
          document.querySelector('.loader').classList.replace('d-flex','d-none')
        }
      }
    }else{
      Swal.fire({
        title: "You Are Not Authorized",
        text: `Please Login First`,

      });
    }
    
  });

function validateAllCrewInputs(regex, element, alertMsg) {
  let pattern = regex;

  if (pattern.test(element.value) == true) {
    alertMsg.classList.replace("d-block", "d-none");
    return true;
  } else {
    alertMsg.classList.replace("d-none", "d-block");
    return false;
  }
}

function checkIfAllCrewInputsAreValid() {
  if (
    validateAllCrewInputs(/^[a-zA-Z].{3,}$/m, nameInput, nameInputAlert) &&
    validateAllCrewInputs(
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/,
      emailInput,
      emailInputAlert
    ) &&
    validateAllCrewInputs(
      /^(?:(?:\+|00)20|0)?1[0125]\d{8}$/,
      phoneInput,
      phoneInputAlert
    ) &&
    isDateSelected() &&
    validateAllCrewInputs(/^.{4,}$/m, addressInput, addressInputAlert) &&
    isGenderSelected() &&
    isPictureSelected() &&
    isCvSelected()
  ) {
    console.log('all is Valid');
    return true;
  } else {
    console.log('validation not okay');
    return false;
  }
}

function isPictureSelected() {
  const pictureInput = document.getElementById("pictureInput");
  const selectedFiles = pictureInput.files;

  if (selectedFiles.length === 0) {
    // No file selected
    console.log("No file selected");
    pictureInputAlert.classList.replace("d-none", "d-block");
    return false;
  } else {
    // File(s) selected
    console.log("File selected");
    pictureInputAlert.classList.replace("d-block", "d-none");
    return true;
  }
}
function isCvSelected() {
  const cvInput = document.getElementById("cvInput");
  const selectedFiles = cvInput.files;

  if (selectedFiles.length === 0) {
    // No file selected
    console.log("No file selected");
    cvInputAlert.classList.replace("d-none", "d-block");
    return false;
  } else {
    // File(s) selected
    console.log("File selected");
    cvInputAlert.classList.replace("d-block", "d-none");
    return true;
  }
}

function isDateSelected() {
  const selectedDate = document.getElementById("dateCrewInput").value;
  if (!selectedDate) {
    // Date is not selected
    console.log("date is not selected");
    dateCrewInputAlert.classList.replace("d-none", "d-block");
    return false;
  } else {
    // Date is selected
    console.log("date selected");
    dateCrewInputAlert.classList.replace("d-block", "d-none");
    return true;
  }
}

function isGenderSelected() {
  const genderOptions = document.getElementsByName("Gender");
  for (let i = 0; i < genderOptions.length; i++) {
    if (genderOptions[i].checked) {
      // Gender is selected
      console.log("gender is selected");
      genderInputAlert.classList.replace("d-block", "d-none");
      return true;
    }
  }
  // Gender is not selected
  console.log("gender is not selected");
  genderInputAlert.classList.replace("d-none", "d-block");
  return false;
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