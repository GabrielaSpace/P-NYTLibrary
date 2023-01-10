//Phase1
 window.addEventListener('load',()=>{
    const containerLoader =document.querySelector('#loadercontainer');
    containerLoader.style.opacity=0;
    containerLoader.style.visibility = 'hidden'}) 

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
                            <a href=${object.amazon_product_url} target='_blank'>Buy on amazon</a>`}
}booksLists()  
