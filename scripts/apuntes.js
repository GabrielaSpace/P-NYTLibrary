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