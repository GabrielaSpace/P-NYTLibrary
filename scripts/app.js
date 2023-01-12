//Animation
window.addEventListener('load',()=>{
  const containerLoader =document.querySelector('#loadercontainer');
  containerLoader.style.opacity=0;
  containerLoader.style.visibility = 'hidden'}) 


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
const firebaseConfig = {
  apiKey: "AIzaSyBX0Y3sFj84J85Nnu2dqP--4vidaZX0T88",
  authDomain: "p-nytlibrary-auth.firebaseapp.com",
  projectId: "p-nytlibrary-auth",
  storageBucket: "p-nytlibrary-auth.appspot.com",
  messagingSenderId: "618810417283",
  appId: "1:618810417283:web:55939d4f0510dd2a40bbb6",
  measurementId: "G-NVB71RFMP2",
};

//Phase1
let containerPpal=document.querySelector('#dashboard');
let containerBooks=document.querySelector('#booksSection');
async function listName() {
  const result =await fetch (`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=J3nmH8Nj3Y5btF8WIQMVZohXdMNHAEzW`);
  const database = await result.json();
  const listNames = database.results;

  for (let i=0; i<listNames.length;i++){containers (listNames[i])}
  function containers(object,i){
      let containerU = document.createElement('article');
      containerU.setAttribute('class','theList');
      containerPpal.appendChild(containerU);
      containerU.innerHTML=`<h3>${object.list_name}</h3>
                          <p>Oldest published: ${object.oldest_published_date}</p>
                          <p>Latest published: ${object.newest_published_date}</p>
                          <p>Update frequency: ${object.updated.toLowerCase()}</p>
                          <button type='button' id='${object.list_name_encoded}'>See more...</button>`
      document.querySelector(`#${object.list_name_encoded}`).addEventListener('click',()=>{booksLists(object.list_name_encoded,object.list_name);
      containerPpal.style.display= 'none';
      containerBooks.style.display='flex';
  })}}listName() 

async function booksLists(codeList,name){
  let resp = await fetch (`https://api.nytimes.com/svc/books/v3/lists/current/${codeList}.json?api-key=J3nmH8Nj3Y5btF8WIQMVZohXdMNHAEzW`)
  let database = await resp.json();
  let booksList=database.results.books;
  containerBooks.innerHTML=`<div id='goBackTitle'><h1>List: ${name}<h1></br></br></br>
  <button id='goBack' type='button'>Go back</button></div>`
  document.querySelector('#goBack').addEventListener('click',
  ()=>{containerBooks.style.display='none';
      containerPpal.style.display='flex';
      listName();
  })

  for(let i=0; i<booksList.length;i++){bookContainer(booksList[i])}
  function bookContainer(object){
      let containerB= document.createElement('article');
      containerB.setAttribute('class','cover');
      containerBooks.appendChild(containerB);
      containerB.innerHTML=`<img src=${object.book_image} alt=${object.title}>
                          <h3>N°${object.rank}. ${object.title}</h3>
                          <p>Weeks on list: ${object.weeks_on_list}</p>
                          <p>${object.description}</p>
                          <div class='amazonFav'><a href=${object.amazon_product_url} target='_blank'>Buy on Amazon</a>
                          <a>+ Add to favorites</a></div>`}
}booksLists()


//Phase 2
// Initialize Firebase
 const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
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
        break;}}
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
              break;}}
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