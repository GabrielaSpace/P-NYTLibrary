// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"
import { createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBX0Y3sFj84J85Nnu2dqP--4vidaZX0T88",
  authDomain: "p-nytlibrary-auth.firebaseapp.com",
  projectId: "p-nytlibrary-auth",
  storageBucket: "p-nytlibrary-auth.appspot.com",
  messagingSenderId: "618810417283",
  appId: "1:618810417283:web:55939d4f0510dd2a40bbb6",
  measurementId: "G-NVB71RFMP2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)










const signUpForm =document.querySelector('#signUpForm');


signUpForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
const signUpUserName =document.querySelector('#userSignUp').value;
const signUpEmail =document.querySelector('#emailSignUp').value;
const signUpPassword=document.querySelector('#passwordSignUp').value;
console.log(signUpEmail,signUpPassword,signUpUserName);
try {
    const userCredentials =await createUserWithEmailAndPassword(auth,signUpEmail,signUpPassword)
console.log(userCredentials)
} catch (error) {
    console.log(error.message)
    console.log(error.code)

    if(error.code==='auth/invalid-email'){
        alert('invalid email')
    }if(error.code==='auth/weak-password'){
        alert('Weak password, the password should be at least 6 characters')
    }
}
})