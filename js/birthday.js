// https://junglejamboree.runasp.net/    Base Url
let childsSelect = document.getElementById("childsSelect");
let NameInput = document.getElementById("NameInput");
let dateInputBirthday = document.getElementById("dateInputBirthday");
let guestNumberInput = document.getElementById("guestNumberInput");
let themeInput = document.getElementById("themeInput");
let activityInput = document.getElementById("activityInput");
let locationTypeSelect = document.getElementById("locationTypeSelect");
let birthdayForm = document.getElementById("birthdayForm");
let PaymentMethodSelect = document.getElementById("PaymentMethodSelect");

//! birthday alert
const childsSelectAlert = document.getElementById("childsSelectAlert");
const dateInputBirthdayAlert = document.getElementById(
  "dateInputBirthdayAlert"
);
const guestNumberInputAlert = document.getElementById("guestNumberInputAlert");
const themeInputAlert = document.getElementById("themeInputAlert");
const activityInputAlert = document.getElementById("activityInputAlert");
const locationTypeSelectAlert = document.getElementById(
  "locationTypeSelectAlert"
);
const PaymentMethodSelectAlert = document.getElementById(
  "PaymentMethodSelectAlert"
);
//! birthday alert

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomStyles() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var mt = random(200);
  var ml = random(50);
  var dur = random(5) + 5;
  return `
    background-color:#f65617;
    color: #f65617; 
    margin: ${mt}px 0 0 ${ml}px;
    animation: float ${dur}s ease-in infinite
    `;
}

function createBalloons(num) {
  var balloonContainer = document.getElementById("balloon-container");
  for (var i = num; i > 0; i--) {
    var balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.cssText = getRandomStyles();
    balloonContainer?.append(balloon);
  }
}

window.onload = function () {
  createBalloons(100);
};

setTimeout(() => {
  document.getElementById("balloon-container")?.remove();
}, 5000);
window.addEventListener("scroll", function () {
  if (window.scrollY > 90) {
    document.getElementById("balloon-container")?.remove();
  }
});

// ######################## birhtday js ########################

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

document
  .getElementById("dateInputBirthday")
  .setAttribute("min", formatDateTime());

// ######################## API js location ########################
let allLocation;
async function getAllLocation() {
  let res = await fetch(
    "https://junglejamboree.runasp.net/api/Location/GetAllLocations",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  let data = await res.json();
  allLocation = data;
  let firstOption = document.getElementById("firstOption");
  let secondOption = document.getElementById("secondOption");

  firstOption.setAttribute("value", allLocation[3].id);
  secondOption.setAttribute("value", allLocation[4].id);
}
getAllLocation();

// ######################## API js Birthday ########################
birthdayForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  if(childsSelect.value != ''){
    if (checkIfAllBirthdayInputsAreValid()) {
      if (localStorage.getItem("userToken") != null) {
        let birthdayData = {
          name: childsSelect.options[childsSelect.options.selectedIndex]
            .innerHTML,
          date: dateInputBirthday.value,
          guestCount: +guestNumberInput.value,
          activity: activityInput.value,
          theme: themeInput.value,
          childId: +childsSelect.value,
          paymentMethod:
            +PaymentMethodSelect.options[
              PaymentMethodSelect.options.selectedIndex
            ].value,
          locationId:
            +locationTypeSelect.options[locationTypeSelect.options.selectedIndex]
              .value,
        };
        console.log(birthdayData);
  
        try {
          let res = await fetch(
            `https://junglejamboree.runasp.net/api/Birthday/CreateBirthday`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
              },
              body: JSON.stringify(birthdayData),
            }
          );
  
          // Check the response content type
          const contentType = res.headers.get("content-type");
          let data;
          if (contentType && contentType.includes("application/json")) {
            data = await res.json();
          } else {
            data = await res.text();
          }
  
          console.log(data);
          if (
            +PaymentMethodSelect.options[
              PaymentMethodSelect.options.selectedIndex
            ].value == 0
          ) {
            Swal.fire({
              title: "Good job!",
              text: `${data.message} and please go to the nearest location to finish your payment`,
              icon: "success",
            });
            resetForm(birthdayForm)
          } else {
            window.open("https://www.paypal.com/eg/home", "_blank");
          }
  
          // getChilds();
        } catch (err) {
          console.log(err, "error");
        }
  
        console.log(childsSelect.value);
      }
       else  {
        Swal.fire({
          title: "Not Authorized",
          text: "You Must Log In first",
          icon: "Error",
        });
      }
    }
  }else{
    Swal.fire({
      title: "You Cannot Make Reservation",
      text: `  ${localStorage.getItem('userToken') ? '':'You Have To Login .. '}Please Add Child`,
    });
  }
  
});

async function getChilds() {
  try{
    let res = await fetch(
      "https://junglejamboree.runasp.net/api/Child/GetChildren",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    let data = await res.json();
    displayChildBirthday(data);
  }catch(err){
    console.log(err);
  }
  
}
getChilds();

function displayChildBirthday(child) {
  console.log(child);
  if(child.length > 0){
    let cartoona = "";
    for (let i = 0; i < child.length; i++) {
      cartoona += `
       <option hidden selected value="">
        Choose Your Child
        </option>
       <option  value="${child[i].id}">${child[i].fName} ${child[i].lname}</option>
      `;
    }
    childsSelect.innerHTML = cartoona;
  } else{
    console.log('no Childs');
  }
  
}

function allValidationBirthdayInputs(regex, element, alertMsg) {
  let pattern = regex;

  if (pattern.test(element.value) == true) {
    alertMsg.classList.replace("d-block", "d-none");
    return true;
  } else {
    alertMsg.classList.replace("d-none", "d-block");
    return false;
  }
}

function checkIfAllBirthdayInputsAreValid() {
  if (
    isOptionSelected() &&
    isDateSelected() &&
    allValidationBirthdayInputs(
      /^[1-9][0-9]*$/,
      guestNumberInput,
      guestNumberInputAlert
    ) &&
    allValidationBirthdayInputs(/^.{3,}$/m, themeInput, themeInputAlert) &&
    allValidationBirthdayInputs(
      /^.{3,}$/m,
      activityInput,
      activityInputAlert
    ) &&
    isLocationSelected() &&
    isPaymentSelected()
  ) {
    return true;
  } else {
    return false;
  }
}

function isOptionSelected() {
  const selectedOption = childsSelect.options[childsSelect.selectedIndex].value;

  if (!selectedOption) {
    // Option is not selected
    childsSelectAlert.classList.replace("d-none", "d-block");
    return false;
  } else {
    // Option is selected
    childsSelectAlert.classList.replace("d-block", "d-none");
    return true;
  }
}
function isLocationSelected() {
  const selectedOption =
    locationTypeSelect.options[locationTypeSelect.selectedIndex].value;

  if (!selectedOption) {
    // Location is not selected
    locationTypeSelectAlert.classList.replace("d-none", "d-block");
    return false;
  } else {
    // Location is selected
    locationTypeSelectAlert.classList.replace("d-block", "d-none");
    return true;
  }
}
function isPaymentSelected() {
  const selectedOption =
    PaymentMethodSelect.options[PaymentMethodSelect.selectedIndex].value;

  if (!selectedOption) {
    // Payment is not selected
    PaymentMethodSelectAlert.classList.replace("d-none", "d-block");
    return false;
  } else {
    // Payment is selected
    PaymentMethodSelectAlert.classList.replace("d-block", "d-none");
    return true;
  }
}

function isDateSelected() {
  const selectedDate = document.getElementById("dateInputBirthday").value;
  if (!selectedDate) {
    // Date is not selected
    dateInputBirthdayAlert.classList.replace("d-none", "d-block");
    return false;
  } else {
    // Date is selected
    dateInputBirthdayAlert.classList.replace("d-block", "d-none");
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