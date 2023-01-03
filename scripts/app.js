/* fase 1

Incluir una animación mientras esperamos la carga del contenido.
Al cargar la web deben de aparecer todas las listas con los siguientes datos:
Nombre completo de la lista
Fecha del libro más antiguo en la lista
Fecha del último libro incorporado
Frecuencia de actualización
Link para poder cargar la lista*/

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

let bMain =document.createElement('main');
let bfooter=document.querySelector('footer');
document.body.insertBefore(bMain,bfooter);
let containerPpal=document.createElement('section');
bMain.appendChild(containerPpal);


async function listName() {
    const result =await fetch (`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=J3nmH8Nj3Y5btF8WIQMVZohXdMNHAEzW`);
    const database = await result.json();
    const listNames = database.results;

    for (let i=0; i<listNames.length;i++){
        listFullName.push(listNames[i].list_name);
        listOldestBookListed.push(listNames[i].oldest_published_date); 
        listLastBookIncorporated.push(listNames[i].newest_published_date); 
        updateFrequency.push(listNames[i].updated);
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
        let listNameOldestBook= document.createElement('h5');
        listNameOldestBook.setAttribute('class','list_name');
        containerU.appendChild(listNameOldestBook);
        listNameOldestBook.textContent=`Oldest published: ${object.oldest_published_date}`;
        let listNameNewestBook= document.createElement('h5');
        listNameNewestBook.setAttribute('class','list_name');
        containerU.appendChild(listNameNewestBook);
        listNameNewestBook.textContent=`Latest published: ${object.newest_published_date}`;
        let listNameUpdate= document.createElement('h5');
        listNameUpdate.setAttribute('class','list_name');
        containerU.appendChild(listNameUpdate);
        listNameUpdate.textContent= `Update frequency: ${object.updated.toLowerCase()}`;

        let butSeeMore= document.createElement('a');
        butSeeMore.setAttribute('href','#');
        containerU.appendChild(butSeeMore);
        butSeeMore.textContent='See more...';
    }

    console.log('b');
}
listName()

let list_name=[];
let listBooks=[];
let bookImage=[];
let bookDescription=[];
let bookTitleRank=[];
let links=[];


/* async function fullOverview() {
    const result =await fetch (`https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=J3nmH8Nj3Y5btF8WIQMVZohXdMNHAEzW`);
    const database = await result.json();
    const fullOverviewList = database.results.lists;
    const fullOverviewBooks= database.results.lists.books;

    for (let i=0; i<fullOverviewList.length;i++){
       list_name.push(fullOverviewList[i].list_name);
    }

    console.log(list_name,bookTitleRank);
}
fullOverview()  */



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