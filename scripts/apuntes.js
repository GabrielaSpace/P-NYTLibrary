document.addEventListener('click',(e)=>{
    console.log('click en',e.target);
     if(e.target.matches(`#${object.list_name_encoded}`)){
    
    } }) 

/* 
let goBack=document.createElement('button');
containerBooks.appendChild(goBack);
goBack.textContent='Go back';
go.onclick= listName();

function goBackB(){
    document.querySelector('#dashboard').style.display ='block';
    document.querySelector('#booksSection').style.display='none';

}  */


async function fullOverview() {
    const result =await fetch (`https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=J3nmH8Nj3Y5btF8WIQMVZohXdMNHAEzW`);
    const database = await result.json();
    const fullOverviewList = database.results.lists;
    const fullOverviewBooks= database.results.lists.books;

    for (let i=0; i<fullOverviewList.length;i++){
       list_name.push(fullOverviewList[i].list_name);
    }

    console.log(list_name,bookTitleRank);
}
fullOverview()  



/* //Show BestSellers(si me da tiempo )
async function BestSellers() {
    const result =await fetch (`https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=J3nmH8Nj3Y5btF8WIQMVZohXdMNHAEzW`);
    const database = await result.json();
    const bestSellersList = database.results;

    for (let i=0; i<bestSellersList.length;i++){
        listBestSeller.push(bestSellersList[i].title); 
    }
    console.log(listBestSeller);
}
BestSellers() */


 /*  if (error.code === "auth/email-already-in-use") {
      alert("Email already in use");
    } else if (error.code === "auth/invalid-email") {
      alert("Invalid email");
    }
    if (error.code === "auth/weak-password") {
      alert("Weak password, the password should be at least 6 characters");
    } else if (error.code) {
      alert("Something went wrong");
    } */