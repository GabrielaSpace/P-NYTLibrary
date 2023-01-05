
//Dashboard Info

window.addEventListener('load',()=>{
    const containerLoader =document.querySelector('#loadercontainer');
    containerLoader.style.opacity=0;
    containerLoader.style.visibility = 'hidden'
}) 

const listFullName=[];
const listOldestBookListed =[];
const listLastBookIncorporated =[];
const updateFrequency=[];
const listBestSeller=[];
let completeList=[];

let bMain =document.createElement('main');
let bfooter=document.querySelector('footer');
document.body.insertBefore(bMain,bfooter);
let containerPpal=document.createElement('section');
containerPpal.setAttribute('id','dashboard');
bMain.appendChild(containerPpal);
let containerBooks=document.createElement('section');
containerBooks.setAttribute('id','booksSection');
bMain.appendChild(containerBooks);


async function listName() {
    const result =await fetch (`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=J3nmH8Nj3Y5btF8WIQMVZohXdMNHAEzW`);
    const database = await result.json();
    const listNames = database.results;

    for (let i=0; i<listNames.length;i++){
        listFullName.push(listNames[i].list_name);
        listOldestBookListed.push(listNames[i].oldest_published_date); 
        listLastBookIncorporated.push(listNames[i].newest_published_date); 
        updateFrequency.push(listNames[i].updated);
        completeList.push(listNames[i]);
        containers (listNames[i]);
    }

    function containers(object){
        let containerU = document.createElement('article');
        containerU.setAttribute('class','containerUList');
        containerPpal.appendChild(containerU);
        let listNameTitle = document.createElement('h3'); 
        listNameTitle.setAttribute('class','list_name');
        containerU.appendChild(listNameTitle);
        listNameTitle.textContent=object.list_name;
        let listNameOldestBook= document.createElement('p');
        listNameOldestBook.setAttribute('class','list_name');
        containerU.appendChild(listNameOldestBook);
        listNameOldestBook.textContent=`Oldest published: ${object.oldest_published_date}`;
        let listNameNewestBook= document.createElement('p');
        listNameNewestBook.setAttribute('class','list_name');
        containerU.appendChild(listNameNewestBook);
        listNameNewestBook.textContent=`Latest published: ${object.newest_published_date}`;
        let listNameUpdate= document.createElement('p');
        listNameUpdate.setAttribute('class','list_name');
        containerU.appendChild(listNameUpdate);
        listNameUpdate.textContent= `Update frequency: ${object.updated.toLowerCase()}`;

        let butSeeMore= document.createElement('button');
        butSeeMore.setAttribute('type','submit');
        butSeeMore.setAttribute('value',`${object.list_name_encoded}`);
        butSeeMore.setAttribute('onclick','#')
        containerU.appendChild(butSeeMore);
        butSeeMore.textContent='See more...';
    }

    console.log(completeList);
}
listName()

function buttonSeeMore(){
    for(let i=0; i>)
}

// let list_name=[];
let bookImage=[];
let bookDescription=[];
let bookTitle=[];
let bookRank=[];
let listWeeks=[];
let links=[];
async function booksLists(list){
    let resp = await fetch (`https://api.nytimes.com/svc/books/v3/lists/current/${list}.json?api-key=J3nmH8Nj3Y5btF8WIQMVZohXdMNHAEzW`)
    let database = await resp.json();
    let booksList=database.results.books;

    for(let i=0; i<booksList.length;i++){
        bookImage.push(booksList[i].book_image);
        bookDescription.push(booksList[i].description);
        bookTitle.push(booksList[i].title);
        bookRank.push(booksList[i].rank);
        listWeeks.push(booksList[i].weeks_on_list);
        links.push(booksList[i].amazon_product_url);
        bookContainer(booksList[i]);
    }

    
function bookContainer(){
    let comeBack=document.createElement('button');
    comeBack.setAttribute('value','Come back');
    comeBack.setAttribute('onclick','#')

    let containerB= document.createElement('article');
    containerB.setAttribute('class','bookC');
    containerB.innerHTML=`<img src=${bookImage} alt=${bookTitle}>
    <h3>N°${bookRank}${bookTitle}</h3>
    <p>Weeks on list: ${listWeeks}</p>
    <p>${description}</p>
    <a href=${links} target='_blank'>Buy on amazon</a>` 
}

}booksLists() 

