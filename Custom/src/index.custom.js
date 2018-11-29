let publishers = [
    {pub: "GUK",
    name: "The Guardian",
    id: "the-guardian-uk"},
    {pub: "BBC",
    name: "BBC",
    id: "bbc-news"},
    {pub: "CNN",
    name: "CNN",
    id: "cnn"},
    {pub: "DM",
    name: "Daily Mirror",
    id: "mirror"},
    {pub: "LR",
    name: "La Repubblica",
    id: "la-repubblica"},
    {pub: "FOX",
    name: "FOX",
    id: "fox-news"},
    {pub: "MRC",
    name: "Marca",
    id: "marca"},
    {pub: "IND",
    name: "The Independent",
    id: "independent"},
    {pub: "RT",
    name: "Russia Today",
    id: "rt&language=ru"},
    {pub: "SPG",
    name: "Spiegel",
    id: "der-tagesspiegel"},
];

function checkStatus(response) {
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        
        return Promise.reject(new Error(response.statusText));
    }
}

function getJSON(response) {
    return response.json();
}

function $(selector){
    return document.querySelector(selector);
}

let news = "https://newsapi.org/v2/everything?sources=the-guardian-uk&pageSize=88&sortBy=popularity&apiKey=61f183b6efeb48cdab07b405197cd533";

function getData(data){
    let i = 0, br = 0;
    while (br < 10){
        if (data.articles[i].title !== null &&
            data.articles[i].urlToImage !== null){
        $(`.img-main${br+1}`).src = `${data.articles[i].urlToImage}`;
        $(`.news-date${br+1}`).innerHTML = `Date: ${data.articles[i].publishedAt.split("T")[0]}`;
        $(`.news-feed${br+1}`).innerHTML = `${data.articles[i].title}...<a class="a${br+1}">read more</a>`;
        br++;
        i++;
    }
    else{
        i++;
    }
    }
}


$(".grid-mobile").addEventListener("click", function(event){
    for (let i = 0; i < publishers.length; i++){
        if (event.target.parentNode.classList.contains(`${publishers[i].pub}`)){
            $("#news-title").innerHTML = `Headlines of ${publishers[i].name}`;

            news = `https://newsapi.org/v2/everything?sources=${publishers[i].id}&pageSize=88&sortBy=popularity&apiKey=61f183b6efeb48cdab07b405197cd533`;
    
    fetch(news)
    .then(checkStatus)
    .then(getJSON)
    .then(function (data) {
        console.log(data);
        getData(data);
    })
    .catch(function (err) {
        console.log("Error ", err);
    })
        }
    }
})

fetch(news)
    .then(checkStatus)
    .then(getJSON)
    .then(function (data) {
        getData(data);
    })
    .catch(function (err) {
        console.log("Error ", err);
})

    $(".menu").addEventListener("click", function(){
        $(".menu").classList.toggle("change");
        $(".mobile").classList.toggle("active");
    });
