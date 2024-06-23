let emailInput = document.getElementById("emailInput");
const forgotPassword = document.getElementById("forgotPassword");

forgotPassword.addEventListener("submit", async function (e) {
  e.preventDefault();

  let test = {
    email: emailInput.value,
  };
  console.log(test);
  try {
    let res = await fetch(
      `https://junglejamboree.runasp.net/api/Account/ForgetPassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
        body: JSON.stringify({
          email: emailInput.value,
        }),
      }
    );
    let data = await res.json()
    console.log(data); 
    if(data.statusCode ==200){
      console.log('Sent');
      Swal.fire({
          title: "Email Sent Successfully",
          text: "Check Your E-mail",
          icon: "success",
        });
        resetForm(forgotPassword)
    }else{
      console.log('Not Sent');
      Swal.fire({
        title: "Invalid Email Aress",
        text: "Please Enter Exist Email",
        icon: "error",
      });
      
    }
  } catch (err) {
    console.log(err, "er");

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