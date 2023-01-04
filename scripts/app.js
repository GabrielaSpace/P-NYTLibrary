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

/* fase 1

Incluir una animación mientras esperamos la carga del contenido.
Al cargar la web deben de aparecer todas las listas con los siguientes datos:
Nombre completo de la lista
Fecha del libro más antiguo en la lista
Fecha del último libro incorporado
Frecuencia de actualización
Link para poder cargar la lista*/

//Dashboard Info
let bMain =document.createElement('main');
let bfooter=document.querySelector('footer');
document.body.insertBefore(bMain,bfooter);
let containerPpal=document.createElement('section');
bMain.appendChild(containerPpal);


async function listName() {
    const result =await fetch (`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=J3nmH8Nj3Y5btF8WIQMVZohXdMNHAEzW`);
    const database = await result.json();
    const listNames = database.results;
    const listBooks =database.results.lists ;

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
        containerU.appendChild(butSeeMore);
        butSeeMore.textContent='See more...';
    }

    console.log('b');
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
