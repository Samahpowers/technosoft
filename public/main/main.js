//import jwt_decode from 'jwt-decode'

document.addEventListener("DOMContentLoaded", ()=>{
const wraper =document.querySelector(".wraper")
const loginLink =document.querySelector(".login-link")
const registerLink =document.querySelector(".register-link")
const btnPopUp =document.querySelector(".login-btn")
const iconClose =document.querySelector(".icon-close")
const userRegistration =document.querySelector(".user-registration")
const userLogin =document.querySelector(".user-login")
const alert = document.querySelector(".alert")




registerLink.addEventListener("click", ()=>{
    wraper.classList.add("active")
})

loginLink.addEventListener("click", ()=>{
    wraper.classList.remove("active")
})

btnPopUp.addEventListener("click", ()=>{
    wraper.classList.add("active-popup")
})
iconClose.addEventListener("click", ()=>{
    wraper.classList.remove("active-popup")
})


// user registration
userRegistration.addEventListener("submit", async(e)=>{
e.preventDefault()
 const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Create an object with the user data
    const userData = {
        phone,
        email,
        password,
    };
    console.log(userData)
    
    
   try {
     const response = await fetch('http://localhost:1500/auth/register', {

                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    
                    body: JSON.stringify(userData)
                });

               const user = await response.json();
                console.log('User created:', user)
                if(user === "User already registered"){
                    alert.textContent="User already registered! Use another email address."
                    alert.style.display = "block"
                    setTimeout(() => {
                        alert.style.display = "none"
                        alert.style.color = "red"
                        userRegistration.reset()
                    }, 3000);
                    
                }else{
                    alert.textContent="Registration Successfull procceed to login."
                    alert.style.display = "block"
                    setTimeout(() => {
                        alert.style.display = "none"
                        userRegistration.reset()
                         wraper.classList.remove("active")
                    }, 3000); 
                }
                
             
                
              
   } catch (error) {
     console.error('Error creating user:', error.message);
   }
    
    })


    //user login
    
    userLogin.addEventListener('submit', async (e) => {
        const loginUserEmail = document.getElementById('login-email').value;
        const loginUserPassword = document.getElementById('login-password').value;
     e.preventDefault()
        // Create a JSON object with the user's credentials
        const data = {
             email: loginUserEmail,
           password: loginUserPassword
        };
   // console.log(data)
const getTokenFromStorage = ()=> {
  // Retrieve the token from the cookie or local storage
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('access_token='));

  return cookieValue ? cookieValue.split('=')[1] || '' : '';
}

/*
    const token = getTokenFromStorage()
        try {
            const response = await fetch('http://localhost:1500/auth/login', { // Updated URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log("results on login",result )
     if (response.status === 200) {
          
  
}
       setTimeout(() => {
                      
                        userLogin.reset()                          
                        wraper.classList.remove("active")
                        wraper.style.display = "none"
                  
                    }, 1500,
                    setTimeout(()=>{
                       window.location.href = ("../exams/exams.html")
                       
                    },1000)
                    );
                  
        } catch (error) {
            console.error('Error:', error);
        }*/

        const token = getTokenFromStorage();
try {
  const response = await fetch('http://localhost:1500/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    body: JSON.stringify(data)
  });
console.log('Response:', response);

  if (response.status === 200) {
    const user = await response.json(); // Parse the response body once
console.log('User object:', user);
// Check the user's role and status from the user object
const userRole = user.role;
const userStatus = user.status;

console.log('Response status:', response.status);
console.log('User role:', userRole);
console.log('User status:', userStatus);

// Construct the redirect URL with query parameters
let redirectURL;
if (userRole === 'admin') {
  redirectURL = '../admin/admin.html';
} else {
  redirectURL = '../exams/exams.html';
}

// Append query parameters to the URL
redirectURL += `?userRole=${userRole}&userStatus=${userStatus}`;

console.log('Redirecting to:', redirectURL);
window.location.href = redirectURL;

  } else {
    // Handle login error if necessary
    // For example, display an error message
    const errorResponse = await response.json(); // Parse error response if available
    console.error('Login failed:', errorResponse.errorMessage);
  }
} catch (error) {
  console.error('Error:', error);
}


    });
    

})

