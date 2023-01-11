// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

//Cloud Firestone
import {getFirestore, getDocs, collection} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"





// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBX0Y3sFj84J85Nnu2dqP--4vidaZX0T88",
  authDomain: "p-nytlibrary-auth.firebaseapp.com",
  projectId: "p-nytlibrary-auth",
  storageBucket: "p-nytlibrary-auth.appspot.com",
  messagingSenderId: "618810417283",
  appId: "1:618810417283:web:55939d4f0510dd2a40bbb6",
  measurementId: "G-NVB71RFMP2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

const signUpForm = document.querySelector("#signUpForm");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const signUpUserName = document.querySelector("#userSignUp").value;
  const signUpEmail = document.querySelector("#emailSignUp").value;
  const signUpPassword = document.querySelector("#passwordSignUp").value;
  console.log(signUpEmail, signUpPassword, signUpUserName);
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      signUpEmail,
      signUpPassword
    );
    console.log(userCredentials);
  } catch (error) {
    console.log(error.message);
    console.log(error.code);

    switch (error.code) {
      case "auth/email-already-in-use":
        alert("Email already in use");
        break;
      case "auth/auth/invalid-email":
        alert("Invalid email");
        break;
      case "auth/weak-password":
        alert("Weak password, the password should be at least 6 characters");
        break;
      default:
        alert("Something went wrong");
        break;
    }
  
  }
});



//log In form

const   LogInForm = document.querySelector("#LogInForm");
LogInForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const email = document.querySelector("#emailLogin").value;
    const password = document.querySelector("#passwordLogin").value;
    

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential)

    }
    catch(error){
        console.log(error.message);
        console.log(error.code);

        switch (error.code) {
            case "auth/wrong-password":
              alert("Wrong password");
              break;
            case "auth/user-not-found":
              alert("User not found");
              break;
            default:
              alert("Something went wrong login");
              break;
    }}

});







//To know if an user is Log or not
const loggedOutLinks=document.querySelectorAll('.logOut');
const loggedInLinks=document.querySelectorAll('.logIn');


const loginCheck = user =>{
    if (user) {
        loggedOutLinks.forEach(li=>li.style.display='none')
        loggedInLinks.forEach(li=>li.style.display='block')
    } else {
        loggedInLinks.forEach(li=>li.style.display='none')
        loggedOutLinks.forEach(li=>li.style.display='block')
    }
}



//Log In
onAuthStateChanged(auth,async(user)=>{
    if (user) {
      const querySnapshot= await getDocs(collection(db, 'favorites'))
      setupFavorites(querySnapshot.docs);
    } else {
        setupFavorites([]);
      
    }
    loginCheck(user)
})


const favoritesList =document.querySelector('.favoriteList')

const setupFavorites =(data)=>{
    if(data.length){
        let html =''
        data.forEach(fav=>{
          const favorite=fav.data()
          const li=`<li>
          <h3>${favorite.title}</h3>
          <p>${favorite.content}</p>
          </li>`
          html +=li
        })
        favoritesList.innerHTML= html
    }else{
        favoritesList.innerHTML=`<h2>There are no favorites yet</h2>`
    }
}

//Log Out
const logOut = document.querySelector('#logOutBut')
logOut.addEventListener('click', async()=>{
    await signOut(auth)
    
})

