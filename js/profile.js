let userData = document.getElementById("userData");

async function getUserInfo() {
  let res = await fetch(
    "https://junglejamboree.runasp.net/api/Account/GetUserInfo",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  let data = await res.json();
  console.log(data);
  displayUserData(data);
}

window.addEventListener("load", function () {
  getUserInfo();
});

function displayUserData(data) {
  let cartona = "";

  cartona += `

     <div
                          class="overview rad-10 d-flex align-center"
                        >
                          <div class="info-box w-full txt-c-mobile">
                            <div class="box p-20 d-flex align-center">
                              <div class="fs-14">
                                <span class="c-grey">Full Name: </span>
                                <span>${data.fName}  ${data.lname}</span>
                              </div>
                            </div>
                            <div class="box p-20 d-flex align-center">
                              <div class="fs-14">
                                <span class="c-grey">Gender:</span>
                                <span>${data.gender == 1 ? "male" : "female"}</span>
                              </div>
                            </div>
                            <div class="box p-20 d-flex align-center">
                              <div class="fs-14">
                                <span class="c-grey">Date Of Birth:</span>
                                <span>${data.dob.day}/${data.dob.month}/${data.dob.year}</span>
                              </div>
                            </div>
                            <div class="box p-20 d-flex align-center">
                              <div class="fs-14">
                                <span class="c-grey">Address:</span>
                                <span>${data.address}</span>
                              </div>
                            </div>
                          </div>
                        </div>
  
  `;

  //

  userData.innerHTML = cartona;
}

/*

 */
