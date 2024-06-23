const addAlgBtn = document.getElementById("addAlgBtn");
const addMedicalBtn = document.getElementById("addMedicalBtn");





//! inputs
const medicalInput = document.getElementById("medicalInput");
const medicalDesc = document.getElementById("medicalDesc");
const algInput = document.getElementById("algInput");
const algDesc = document.getElementById("algDesc");

//! inputs

//! inputs Alerts
const medicalInputAlert = document.getElementById("medicalInputAlert");
const medicalDescAlert = document.getElementById("medicalDescAlert");
const algInputAlert = document.getElementById("algInputAlert");
const algDescAlert = document.getElementById("algDescAlert");

//! inputs Alerts


let childDetail;
let id;
getIdParam();
getChildDetails();
addAlgBtn.addEventListener("click", addAlg);
addMedicalBtn.addEventListener("click", addMedicalCond);
async function getChildDetails() {
  try {
    let res = await fetch(
      `https://junglejamboree.runasp.net/api/Child/GetChildById?id=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    childDetail = await res.json();
    console.log(childDetail);
    displayChildDetails();
  } catch (err) {
    console.log(err);
  }
}
function getIdParam() {
  const detialsWrapper = document.getElementById("detialsWrapper");
  // Get the current URL
  const url = new URL(window.location.href);

  // Get the value of the 'id' parameter
  id = +url.searchParams.get("id");
}

function displayChildDetails() {
  childDetail.gender == 1
    ? childImg.setAttribute("src", "./img/child user.png")
    : childImg.setAttribute("src", "./img/child user girl.png");
  childName.innerHTML = `${childDetail.fName} ${childDetail.lname}`;
  childEmergency.innerHTML = childDetail.emergencyContact;
  childGender.innerHTML = childDetail.gender == 1 ? "Male" : "Female";
  childBirth.innerHTML = calculateAge(childDetail.dob);
  medicalList.innerHTML = childDetail.medicalConditions.map((mc) => {
    return ` <li><span class="fw-bold text-black ">${mc}</span><i class="fa-solid fa-trash mx-3 text-danger" onclick="deleteMedicalCond('${mc}')"></i></li>`;
  });
  algList.innerHTML = childDetail.allergies.map((al) => {
    return ` <li><span class="fw-bold text-black ">${al}</span><i class="fa-solid fa-trash mx-3 text-danger" onclick="deleteAlg('${al}')"></i></li>`;
  });
}
async function addAlg() {
  if (checkAllAlergiesInputsAreValid() == true) {
    try {
      let res = await fetch(
        "https://junglejamboree.runasp.net/api/Child/AddAllergis",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          body: JSON.stringify({
            childId: id,
            allergies: algInput.value,
            allergiesDescreption: algDesc.value,
          }),
        }
      );
      let data = await res.json();
      console.log(data);
      getChildDetails();
      Swal.fire({
        title: "Good job!",
            text: `Allergies Added Successfuly`,
            icon: "success",
          });
    } catch (err) {
      console.log(err);
    }
  }

}
async function addMedicalCond() {
  if (checkAllMedicalInputsAreValid() == true) {
    try {
      let res = await fetch(
        "https://junglejamboree.runasp.net/api/Child/AddMedicalCondition",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          body: JSON.stringify({
            childId: id,
            medicalConditions: medicalInput.value,
            medicalConditionsDescreption: medicalDesc.value,
          }),
        }
      );
      let data = await res.json();
      console.log(data);
      getChildDetails();
      Swal.fire({
        title: "Good job!",
            text: `Medical Condition Added Successfuly`,
            icon: "success",
          });
    } catch (err) {
      console.log(err);
    }
  }

}
async function deleteAlg(algName) {
  try {
    let res = await fetch(
      "https://junglejamboree.runasp.net/api/Child/DeleteAllergis",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
          childId: id,
          allergies: algName,
          allergiesDescreption: "test",
        }),
      }
    );
    let data = await res.text();
    console.log(data);
    getChildDetails();
    Swal.fire({
      title: "Done!",
          text: `Allergies Deleted Successfuly`,
          icon: "success",
        });
  } catch (err) {
    console.log(err);
  }
}
async function deleteMedicalCond(medicalName) {
  try {
    let res = await fetch(
      "https://junglejamboree.runasp.net/api/Child/DeleteMedicalCondition",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
          childId: id,
          medicalConditions: medicalName,
          medicalConditionsDescreption: "test",
        }),
      }
    );
    let data = await res.text();
    console.log(data);
    getChildDetails();
    Swal.fire({
      title: "Done!",
          text: `Medical Condition Deleted Successfuly`,
          icon: "success",
        });
  } catch (err) {
    console.log(err);
  }
}
function calculateAge(dob) {
  // Get the current date
  var currentDate = new Date();

  // Extract the year, month, and day from the DOB object
  var year = dob.year;
  var month = dob.month - 1; // Months in JavaScript are zero-based (0-11)
  var day = dob.day;

  // Create a new Date object with the DOB
  var birthDate = new Date(year, month, day);

  // Calculate the age
  var age = currentDate.getFullYear() - birthDate.getFullYear();

  // Check if the birthday hasn't occurred yet this year
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age--; // Subtract 1 from the age
  }

  return age;
}



//! validation of medical conditions
function allValidationMedicalInputs(regex, element, alertMsg) {
  let pattern = regex;

  if (pattern.test(element.value) == true) {
    alertMsg.classList.replace("d-block", "d-none");
    return true;
  } else {
    alertMsg.classList.replace("d-none", "d-block");
    return false;
  }
}
function checkAllMedicalInputsAreValid() {
  if (
    allValidationMedicalInputs(
      /^.{2,}$/m,
      medicalInput,
      medicalInputAlert
    ) &&
    allValidationMedicalInputs(
      /^.{2,}$/m,
      medicalDesc,
      medicalDescAlert
    ) 
  ) {
    return true;
  } else {
    return false;
  }
}
//! validation of medical conditions

//! validation of alergies 
function allValidationAlergiesInputs(regex, element, alertMsg) {
  let pattern = regex;

  if (pattern.test(element.value) == true) {
    alertMsg.classList.replace("d-block", "d-none");
    return true;
  } else {
    alertMsg.classList.replace("d-none", "d-block");
    return false;
  }
}
function checkAllAlergiesInputsAreValid() {
  if (
    allValidationAlergiesInputs(
      /^.{2,}$/m,
      algInput,
      algInputAlert
    ) &&
    allValidationAlergiesInputs(
      /^.{2,}$/m,
      algDesc,
      algDescAlert
    ) 
  ) {
    return true;
  } else {
    return false;
  }
}
//! validation of alergies