const username = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const admin = document.getElementById('admin');
const submitBtn = document.getElementById('loginBTN');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'operation.html';
    const Name = username.value;
    const Email = email.value;
    const Password = password.value;
    const IsAdmin = admin.checked;

    if (!isValidEmail(Email)) {
        showError("Invalid email address");
        return;
      }
    
      
      if (!isValidPassword(Password)) {
        showError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.");
        return;
      }

      const user ={
        name:Name,
        email:Email,
        password:Password,
        is_admin:IsAdmin
      }
    //   console.log(user);
    const userString = JSON.stringify(user);
    localStorage.setItem('myData', userString);
    // console.log(userString);

    // Retrieve the user data from localStorage
    // const storedUserString = localStorage.getItem('myData');

    // // Parse the JSON string back to an object
    // const storedUser = JSON.parse(storedUserString);

    console.log(storedUser);
    
});

function isValidEmail(email){
    let emailRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
function isValidPassword(password){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}
function showError(message) {
   alert(message);
  }
  
  function showSuccess(message) {
    alert(message);
  }