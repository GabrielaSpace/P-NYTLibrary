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
import {getFirestore, getDocs, collection, addDoc} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"

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

//Phase 2
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const signUpForm = document.querySelector("#signUpForm");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const signUpUserName = document.querySelector("#userSignUp").value;
  const signUpEmail = document.querySelector("#emailSignUp").value;
  const signUpPassword = document.querySelector("#passwordSignUp").value;
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      signUpEmail,
      signUpPassword
    );
    console.log(userCredentials);
    showMessage('Successful registration')
    showMessage(`Session started: Welcome ${signUpUserName}`)
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        showMessage("Email already in use",error);
        break;
      case "auth/auth/invalid-email":
        showMessage("Invalid email",error);
        break;
      case "auth/weak-password":
        showMessage("Weak password, the password should be at least 6 characters",error);
        break;
      default:
        showMessage("Something went wrong",error);
        break;}}signUpForm.reset()});
//log In form
const   LogInForm = document.querySelector("#LogInForm");
LogInForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const email = document.querySelector("#emailLogin").value;
    const password = document.querySelector("#passwordLogin").value;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        showMessage(`Welcome back ${email}`)
    }
    catch(error){
        switch (error.code) {
            case "auth/wrong-password":
              showMessage("Wrong password",error);
              break;
            case "auth/user-not-found":
              showMessage("User not found",error);
              break;
            default:
              showMessage("Something went wrong login",error);
              break;}}LogInForm.reset()
});

//Log Out
const logOut = document.querySelector('#logOutBut')
logOut.addEventListener('click', async()=>{
    await signOut(auth)
    showMessage('You have successfully logged out')
    showMessage('No user in the system')
})


//Authentication is displayed based on the current state of the user
const loginCheck = user =>{
    if (user) {
        signUpForm.style.display='none'
        LogInForm.style.display='none'
        logOut.style.display='block'
    } else {
      signUpForm.style.display='block'
      LogInForm.style.display='block'
      logOut.style.display='none'
    }
}
//Phase1
let containerPpal=document.querySelector('#dashboard');
let containerBooks=document.querySelector('#booksSection');
let containerFav=document.querySelector('#favorites')

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
      containerFav.style.display='none';

  })}}listName() 

async function booksLists(codeList,name){
  let resp = await fetch (`https://api.nytimes.com/svc/books/v3/lists/current/${codeList}.json?api-key=J3nmH8Nj3Y5btF8WIQMVZohXdMNHAEzW`)
  let database = await resp.json();
  let booksList=database.results.books;
  containerBooks.innerHTML=`<div id='goBackTitle'><h1>List name: ${name}<h1>
  <button id='goBack' type='button'>Go back</button></div>`
  const goBackBut=  document.querySelector('#goBack')
  goBackBut.addEventListener('click',
  ()=>{containerBooks.style.display='none';
      containerPpal.style.display='flex';
      goBackBut.style.display='none';
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
                          <a href=${object.amazon_product_url} target='_blank'>Buy on Amazon</a>
                          <button type='button' id='${object.title}' name='${name}' class='favBut'>+ Add to favorites</button>`
                        }}booksLists()
//Sección favoritos
const favoritesList =document.querySelector('.favoriteList')
/* const favBut=document.querySelector('#botonaddfav')
favBut.addEventListener('click',saveF());

//Guardar favoritos
 function saveF(){
  try{
   const docRef = await addDoc(collection(db, "favorites"),{
   title: document.querySelector('#botonaddfav').value;
   list: document.querySelector('#botonaddfav').name;
  })
  .then((docRef)=>{
    alert('Favorite has been included with ID: ',docRef.id)
  })
  .catch((error)=>{console.log('Error adding favorite',error)})
}
 */
//Log In -Si el usuario esta autenticado puede obtener sus favoritos
onAuthStateChanged(auth,async(user)=>{
  if (user) {
    const querySnapshot= await getDocs(collection(db, 'favorites'))
    setupFavorites(querySnapshot.docs);
    console.log(querySnapshot.docs)
  } else {
      setupFavorites([]);
    
  }
  loginCheck(user)
})

// Pinta los favoritos en el DOM

const setupFavorites =(data)=>{
    if(data.length){
      console.log('aqui deberia aparecer ')
        let html =''
        data.forEach(fav=>{
          const favorite=fav.data()
          const article=`<article class='cover'>
          <h3>Title: ${favorite.title}</h3>
          <p>Belongs to the list:  <b>${favorite.list}<b></p>
          </article>`
          html +=article
        })
        favoritesList.innerHTML= html
    }else{
        favoritesList.innerHTML=`<h2>There are no favorites yet</h2>`
    }
}

//user alerts styles
function showMessage(message, type = "success") {
  Toastify({
    text: message,
    duration: 4000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", 
    position: "center", 
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: type === "success" ? "green" : "red",
    },
  }).showToast();
}

//Views
let home= document.querySelector('#homeView');
let favorite= document.querySelector('#favoriteView');
favorite.addEventListener('click', (e)=>{
  e.preventDefault();
  containerPpal.style.display='none'
  containerBooks.style.display='none'
  containerFav.style.display='flex'
}
)
home.addEventListener('click', (e)=>{
  e.preventDefault();
  containerPpal.style.display='flex'
  containerBooks.style.display='none'
  containerFav.style.display='none'
}
)
