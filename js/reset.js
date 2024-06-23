const passwordInput = document.getElementById("passwordInput");
const confPasswordInput = document.getElementById("confPasswordInput");

// Assuming the URL is stored in a variable called "url"
// const url =
//   "https://junglejamboree.runasp.net/api/Account/ResetPassword?token=CfDJ8MD75ntK7BlCvbO4PtaG4oAh4VI0tlMZH9WiTA%2BKBntFK89qNn5cad1ExI6UTb8H9WqljRuDFCd%2BxpvjVdsc%2BqTTz8l1WI0%2BoAkWVdIlZjqk9dU%2Bi2cDDQUZJj5h72N%2F1TK76NRitMSwEmDN0XVSg99jnLnAg9owwn3Dm3MK3REhmGVeLdIt2lJaJVmVrguGq%2BN9tcxz2Au9KtwldMQNjF5Dt2UB2PltadHUlGi24k9L&email=ahmedreda4060@gmail.com";
const url = window.location.href
// Create a URLSearchParams object with the search params from the URL
const searchParams = new URLSearchParams(url.split("?")[1]);

// Extract the token and email values
const token = searchParams.get("token");
const email = searchParams.get("email");

console.log(token);
console.log(email);

resetPassword.addEventListener("submit", async function (e) {
  e.preventDefault();

  let test = {
    password: passwordInput.value,
    confirmPassword: confPasswordInput.value,
  };
  console.log(test);
  try {
    let res = await fetch(
      `https://junglejamboree.runasp.net/api/Account/ResetPassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
        body: JSON.stringify({
          email: email,
          password: passwordInput.value,
          confirmPassword: confPasswordInput.value,
          token: token,
        }),
      }
    );
    let data = await res.json();

    console.log(data);

    if (data.statusCode == 400) {
      console.log(data.errors);
      Swal.fire({
        title: "Error",
        text: `${data.errors[0]}`,
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Success",
        text: "Password Rest Successfullt",
        icon: "success",
      });
      resetForm(resetPassword)
    }
  } catch (err) {
    console.log(err);
  }



});


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