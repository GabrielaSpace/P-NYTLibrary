const listFullName=[];
const listOldestBookListed =[];
const listLastBookIncorporated =[];
const updateFrequency=[];
const listBestSeller=[]

/* fase 1

Incluir una animación mientras esperamos la carga del contenido.
Al cargar la web deben de aparecer todas las listas con los siguientes datos:
Nombre completo de la lista
Fecha del libro más antiguo en la lista
Fecha del último libro incorporado
Frecuencia de actualización
Link para poder cargar la lista*/

//Dashboard Info
let bMain= document.createElement('main');
document.body.appendChild(bMain);
let bSection = document.createElement('section');
bMain.appendChild(bSection);


async function listName() {
    const result =await fetch (`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=J3nmH8Nj3Y5btF8WIQMVZohXdMNHAEzW`);
    const database = await result.json();
    const listNames = database.results;
    const listBooks =database.results;


    for (let i=0; i<listNames.length;i++){
        listFullName.push(listNames[i].list_name); 
        listOldestBookListed.push(listNames[i].oldest_published_date); 
        listLastBookIncorporated.push(listNames[i].newest_published_date); 
        updateFrequency.push(listNames[i].updated); 
        containers (listNames[i]);
    }
 
    console.log(listFullName,updateFrequency,listOldestBookListed,listLastBookIncorporated);
    
}
listName()

/* fase 1. parte 2
Los libros deben estar organizados según el orden de la lista oficial
Incluir
Carátula del libro
Cantidad de semanas que lleva en la lista
Descripción
Titulo y la posición que ocupa en la lista ( #1 titulo.... #2 titulo....)
Link para poder comprar el libro en amazon (debe abrirse en otra pestaña)
 */
/* 
async function listBooks(params) {
    const result = await fetch ()

    
}

 */

/* async function fullOverview() {
    const result =await fetch (`https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=J3nmH8Nj3Y5btF8WIQMVZohXdMNHAEzW`);
    const database = await result.json();
    const fullOverviewList = database.results.lists;

    for (let i=0; i<fullOverviewList.length;i++){
        listFullName.push(fullOverviewList[i].list_name); 
        /* listOldestBookListed.push(fullOverviewList[i].list_name); 
        listLastBookIncorporated.push(fullOverviewList[i].list_name);  
        updateFrequency.push(fullOverviewList[i].updated); 

    }
    console.log(listFullName,updateFrequency);
    
}
fullOverview() */



/* //BestSellers
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