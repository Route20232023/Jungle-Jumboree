const eventTypeSelect = document.getElementById("eventTypeSelect");
const eventInputDate = document.getElementById("eventInputDate");
const eventPerson = document.getElementById("eventPerson");
const eventEstimatedBudget = document.getElementById("eventEstimatedBudget");
const eventDestination = document.getElementById("eventDestination");
const eventPreferdActivites = document.getElementById("eventPreferdActivites");
const eventInformation = document.getElementById("eventInformation");
const eventForm = document.getElementById("eventForm");

//! events alerts
const eventTypeSelectAlert = document.getElementById("eventTypeSelectAlert");
const eventInputDateAlert = document.getElementById("eventInputDateAlert");
const eventPersonAlert = document.getElementById("eventPersonAlert");
const eventEstimatedBudgetAlert = document.getElementById(
  "eventEstimatedBudgetAlert"
);
const eventDestinationAlert = document.getElementById("eventDestinationAlert");
const eventPreferdActivitesAlert = document.getElementById(
  "eventPreferdActivitesAlert"
);
const eventInformationAlert = document.getElementById("eventInformationAlert");

//! events alerts
// ######################## Events js ########################

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
eventInputDate.setAttribute("min", formatDateTime());

// ######################## Events js ########################

// ######################## Events API js ########################
eventForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  if(localStorage.getItem('userToken')){
    if (checkIfAllEventsInputsAreValid()) {
      if (localStorage.getItem("userToken") != null) {
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
                destnation: eventDestination.value,
                activity: eventPreferdActivites.value,
                date: eventInputDate.value,
                type: eventTypeSelect.value,
                additionalInfo: eventInformation.value,
                budgetPerPerson: eventEstimatedBudget.value,
                numberPerPerson: eventPerson.value,
              }),
            }
          );
          if (res.ok) {
            // applied successful
            let data = await res.json();
            // Do something for a applied a trip
            console.log(data);
            Swal.fire({
              title: "Good job!",
              text: `${data.message} Your Request Will Be Reviwed And You Will Recieve An E-mail Soon`,
              icon: "success",
            });
            resetForm(eventForm)
            console.log("All done");
    
          } else {
            // applied failed
            let errorData = await res.json();
            console.log(errorData);
            console.log("not done");
          }
        } catch (err) {
          console.log(err, "er");
        }
      } else {
        Swal.fire({
          title: "Not Authorized",
          text: "You Must Log In first",
          icon: "Error",
        });
      }
    }
  
  }else{
    Swal.fire({
      title: "You Are Not Authorized",
      text: 'Please Login First',
    });
  }
 


});

// ######################## Events API js ########################

function allValidationEventsInputs(regex, element, alertMsg) {
  let pattern = regex;
  if (pattern.test(element.value) == true) {
    console.log("valid wlahy");
    alertMsg.classList.replace("d-block", "d-none");
    return true;
  } else {
    console.log("msh valid wlahy");
    alertMsg.classList.replace("d-none", "d-block");
    return false;
  }
}

function checkIfAllEventsInputsAreValid() {
  if (
    isOptionSelected() &&
    isDateSelected() &&
    allValidationEventsInputs(/^[1-9][0-9]*$/, eventPerson, eventPersonAlert) &&
    allValidationEventsInputs(
      /^[1-9][0-9]*$/,
      eventEstimatedBudget,
      eventEstimatedBudgetAlert
    ) &&
    allValidationEventsInputs(
      /^.{4,}$/m,
      eventDestination,
      eventDestinationAlert
    ) &&
    allValidationEventsInputs(
      /^.{4,}$/m,
      eventPreferdActivites,
      eventPreferdActivitesAlert
    ) &&
    allValidationEventsInputs(
      /^.{3,}$/m,
      eventInformation,
      eventInformationAlert
    )
  ) {
    console.log("all are valid");
    return true;
  } else {
    console.log("all not valid");
    return false;
  }
}

function isDateSelected() {
  const selectedDate = document.getElementById("eventInputDate").value;
  if (!selectedDate) {
    // Date is not selected
    console.log("date is not selected");
    eventInputDateAlert.classList.replace("d-none", "d-block");
    return false;
  } else {
    // Date is selected
    console.log("date selected");
    eventInputDateAlert.classList.replace("d-block", "d-none");
    return true;
  }
}

function isOptionSelected() {
  const selectedOption =
    eventTypeSelect.options[eventTypeSelect.selectedIndex].value;

  if (!selectedOption) {
    // Option is not selected
    console.log("Option is not selected");
    eventTypeSelectAlert.classList.replace("d-none", "d-block");
    return false;
  } else {
    // Option is selected
    console.log("Option selected");
    eventTypeSelectAlert.classList.replace("d-block", "d-none");
    return true;
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