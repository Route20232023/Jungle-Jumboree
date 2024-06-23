const childsContainer = document.getElementById("childsContainer");
const detailsCamp = document.getElementById("detailsCamp");
// Get the search parameters from the current URL
var searchParams = new URLSearchParams(window.location.search);

// Get the value of the "id" parameter
var id = searchParams.get("id");
// Button According to role 
let signInOrLogOut = document.querySelector('.signInOut')
console.log(signInOrLogOut)

if(localStorage.getItem('userToken')!= null){
  signInOrLogOut.innerHTML = 'Log Out';
  signInOrLogOut.addEventListener('click',(e)=>{
    e.preventDefault()
    localStorage.removeItem('userToken');
    window.location.href = "login.html"
  })
}else{
  signInOrLogOut.innerHTML = 'Sign In';
  signInOrLogOut.addEventListener('click',(e)=>{
    window.location.href = "login.html"
    e.preventDefault()
    console.log('testtt');
  })

}

console.log(id); // Output: The value of the "id" parameter in the current URL

//get childs
async function getChilds() {
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
  console.log(data, "childddaa");
  if(res.ok){

    displayChild(data);
  }else{
    childsContainer.innerHTML='<p>No Childs Added</p>'
  }
}
async function getAllCamps() {
  let res = await fetch(
    `https://junglejamboree.runasp.net/api/Camp/GetCampById?id=${id}`
  );
  let data = await res.json();
  console.log(data);
  displayCamps(data);
  return data
}
getAllCamps();
getChilds();

function displayCamps(data) {
  let cartoona = "";
  let imgDesc =
    data.description == "WinterCamp"
      ? "./winter-camp.jpg"
      : data.description == "SummerCamp"
      ? "./summer camp.jpg"
      : data.description == "HalloweenCamp"
      ? "./haloween-camp.jpg"
      : "./Spring-camp.jpg";

  cartoona += `<div class="classes-item">
              <div class="bg-dark rounded p-4 ">
                <span class="d-block text-center text-white h1 mt-3 mb-4" href=""
                  >${data.description}</span
                >
                  <p class="text-center text-white-50">${data.campType}</p>
                <div class="row g-1">
                  <div class="col-6 text-center">
                    <div class="border-top border-3 border-primary pt-2">
                      <h6 class="text-primary mb-1">Age:</h6>
                      <small>${data.ageRange} Years</small>
                    </div>
                  </div>
                  <div class="col-6 text-center">
                    <div class="border-top border-3 border-success pt-2">
                      <h6 class="text-success mb-1">Start Date / End Date</h6>
                      <small>${new Date(data.startDate).toLocaleString(
                        "en-us",
                        { dateStyle: "medium" }
                      )} / ${new Date(data.endDate).toLocaleString("en-us", {
    dateStyle: "medium",
  })}</small>
                    </div>
                  </div>
                  <div class="col-6 text-center">
                       <div class="border-top border-3 border-warning pt-2">
                      <h6 class="text-warning mb-1">Capacity:</h6>
                      <small>${data.capacity} Kids</small>
                    </div>
                  </div>
                  <div class="col-6 text-center">
                    <div class="border-top border-3 border-info pt-2">
                      <h6 class="text-info mb-1">Location:</h6>
                      <small>${data.locationName}</small>
                    </div>
                  </div>
                  <div class="col-12 text-center">
                    <div class="border-top border-3 border-danger pt-2">
                      <h6 class="text-danger mb-1">Fees:</h6>
                      <small>${data.registrationFees}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    `;

  detailsCamp.innerHTML = cartoona;
}

function displayChild(child) {
  console.log(child , " from display child");
  let cartoona = "";
  for (let i = 0; i < child.length; i++) {
    cartoona += `
         <div class="col-md-6 col-lg-4">
                <div class="inner d-flex flex-column align-items-center bg-dark rounded p-3 position-relative">
                  <i class="fa-solid fa-child fs-1 mb-3 text-white"></i>
                  ${id == child[i].campId ? '<i class="fa-solid fa-check text-success alreadyAdded"></i>' : ""}
                  <span class="text-white">${child[i].fName}</span>
                  <button onclick="addChildToCamp(${child[i].id} , ${id})" class="btn btn-success w-100 my-2">Add</button>
                  <button onclick="deleteChildFromCamp(${child[i].id} , ${id})" class="btn btn-danger w-100 my-2">Delete</button>
                </div>
              </div>
        `;
  }
  childsContainer.innerHTML = cartoona;
}

async function addChildToCamp(childId, campId) {
  console.log("##########");
  console.log(childId);
  console.log(campId);

  let res = await fetch(
    `https://junglejamboree.runasp.net/api/Child/AddChildToCamp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify({
        childId: childId,
        campId: campId,
        paymentMethod: 0,
      }),
    }
  );
  let data = await res.json();
  console.log(data);

   await getChilds()
   Swal.fire({
    title: "Good job!",
        text: `${data.message == 'Updated Successfully' ? 'Added Successfully': data.message }`,
        icon: "success",
      });
}

async function deleteChildFromCamp(childId, campId) {
  let res = await fetch(
    `https://junglejamboree.runasp.net/api/Child/DeleteChildFromCamp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify({
        childId: childId,
        campId: campId,
        paymentMethod: 0,
      }),
    }
  );
  let data = await res.json();
  console.log(data);
   await getChilds();
   
   Swal.fire({
    // title: "Good job!",
        text: `${data.message}`,
      });
// displayChild(childData)
}
