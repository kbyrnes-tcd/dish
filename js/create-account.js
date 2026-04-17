//create account logic

const firstName = document.getElementById('firstName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const createBtn = document.getElementById('createAccountBtn');

createBtn.addEventListener('click', (e) => {
  e.preventDefault(); //prevent form submission

  if (!firstName.value || !email.value || !password.value || !confirmPassword.value) {
    alert("Please fill out all fields.");
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }

  //send data to server NOTE WILL NEED TO UPDATE THIS
  alert(`Account created for ${firstName.value} (${email.value})!`);
});