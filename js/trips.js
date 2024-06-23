//trip input feilds
const tripTypeSelect = document.getElementById("tripTypeSelect");
const dataInputTrips = document.getElementById("dataInputTrips");
const tripPerson = document.getElementById("tripPerson");
const tripEstimatedBudget = document.getElementById("tripEstimatedBudget");
const tripDestination = document.getElementById("tripDestination");
const tripPreferdActivites = document.getElementById("tripPreferdActivites");
const tripInformation = document.getElementById("tripInformation");
const submitBtn = document.getElementById("submitBtn");
const tripForm = document.getElementById("tripForm");

//! trips alerts
let tripTypeSelectAlert = document.getElementById("tripTypeSelectAlert");
let dataInputTripsAlert = document.getElementById("dataInputTripsAlert");
let tripPersonAlert = document.getElementById("tripPersonAlert");
let tripEstimatedBudgetAlert = document.getElementById(
  "tripEstimatedBudgetAlert"
);
let tripDestinationAlert = document.getElementById("tripDestinationAlert");
let tripPreferdActivitesAlert = document.getElementById(
  "tripPreferdActivitesAlert"
);
let tripInformationAlert = document.getElementById("tripInformationAlert");
//! trips alerts

// let dataInputs = [];
// let spamFounded = false;

// if (localStorage.spams != null) {
//   dataInputs = JSON.parse(localStorage.getItem("spams"));
//   console.log(dataInputs);
// }

// ###################### trips js ####################

// ######################## Date js ########################

function formatDateTime() {
  //validation of date
  // Create a new Date object
  const currentDate = new Date();

  // Get the current date components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Note: month is zero-based
  const day = currentDate.getDate();

  // Get the current time components
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  // Format the date and time as desired (adjust the format to your needs)
  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
  const formattedTime = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;

  // Combine the formatted date and time
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  // Use the formatted date and time as needed
  return formattedDateTime;
}
document.getElementById("dataInputTrips").setAttribute("min", formatDateTime());



// ######################## API js ########################

tripForm.addEventListener("submit", async function (e) {
  e.preventDefault();
if(localStorage.getItem('userToken')){
  if (checkIfAllInputsAreValid() == true) {
    if(localStorage.getItem('userToken')!= null){
      try {
        let res = await fetch(
          `https://junglejamboree.runasp.net/api/TripsEvent/ApplyTripsEvent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
            body: JSON.stringify({
              destnation: tripDestination.value,
              activity: tripPreferdActivites.value,
              date: dataInputTrips.value,
              type: tripTypeSelect.value,
              additionalInfo: tripInformation.value,
              budgetPerPerson: tripEstimatedBudget.value,
              numberPerPerson: tripPerson.value,
            }),
          }
        );
        if (res.ok) {
          // applied successful
          let data = await res.json();
          // Do something for a applied a trip
          console.log(data);
          console.log("All done");
          Swal.fire({
            title: "Good job!",
            text:`${data.message} Your Request Will Be Reviwed And You Will Recieve An E-mail Soon `,
            icon: "success",
          });
        } else {
          let errorData = await res.json();
          console.log(errorData);
          console.log("not done");
        }
      } catch (err) {
        console.log(err, "er");
      }
    }else{
      Swal.fire({
        title: "Not Authorized",
        text: "You Must Log In first",
        icon: "error",
      });
    }
   
  }
}else{
  Swal.fire({
    title: "You Are Not Authorized",
    text: 'Please Login First',
   
  });
}
  
loopThroughFormInputs(this)
});

function tripsAllValidationInputs(regex, element, alertMsg) {
  let pattern = regex;

  if (pattern.test(element.value) == true) {
    alertMsg.classList.replace("d-block", "d-none");
    return true;
  } else {
    alertMsg.classList.replace("d-none", "d-block");
    return false;
  }
}

function checkIfAllInputsAreValid() {
  if (
    isOptionSelected() &&
    isDateSelected() &&
    tripsAllValidationInputs(/^[1-9][0-9]*$/, tripPerson, tripPersonAlert) &&
    tripsAllValidationInputs(
      /^[1-9][0-9]*$/,
      tripEstimatedBudget,
      tripEstimatedBudgetAlert
    ) &&
    tripsAllValidationInputs(
      /^.{4,}$/m,
      tripDestination,
      tripDestinationAlert
    ) &&
    tripsAllValidationInputs(
      /^.{4,}$/m,
      tripPreferdActivites,
      tripPreferdActivitesAlert
    ) &&
    tripsAllValidationInputs(/^.{3,}$/m, tripInformation, tripInformationAlert)
  ) {
    console.log("all are valid");
    return true;
  } else {
    console.log("all are not valid");
    return false;
  }
}

function isOptionSelected() {
  const selectedOption =
    tripTypeSelect.options[tripTypeSelect.selectedIndex].value;

  if (!selectedOption) {
    // Option is not selected
    console.log("Option is not selected");
    tripTypeSelectAlert.classList.replace("d-none", "d-block");
    return false;
  } else {
    // Option is selected
    console.log("Option selected");
    tripTypeSelectAlert.classList.replace("d-block", "d-none");
    return true;
  }
}

function isDateSelected() {
  const selectedDate = document.getElementById("dataInputTrips").value;
  if (!selectedDate) {
    // Date is not selected
    console.log("date is not selected");
    dataInputTripsAlert.classList.replace("d-none", "d-block");
    return false;
  } else {
    // Date is selected
    console.log("date selected");
    dataInputTripsAlert.classList.replace("d-block", "d-none");
    return true;
  }
}












function loopThroughFormInputs(form) {
  // Check if the form parameter is a valid form element
  if (!(form instanceof HTMLFormElement)) {
      console.error("The provided element is not a valid form.");
      return;
  }

  // Get all input elements within the form
  const inputs = form.elements;

  // Loop through each input element
  for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      
      input.value=""
  }
}


