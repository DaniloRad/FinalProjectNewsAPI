function $(selector){
    return document.querySelector(selector);
}

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

let headlineNews = "https://newsapi.org/v2/top-headlines?country=us&apiKey=61f183b6efeb48cdab07b405197cd533";
let flashNews = "https://newsapi.org/v2/everything?q=health&apiKey=61f183b6efeb48cdab07b405197cd533";
let topNews = "https://newsapi.org/v2/top-headlines?sources=al-jazeera-english&apiKey=61f183b6efeb48cdab07b405197cd533";


$(".btn-loadMore").addEventListener("click", function(){
    let output = $(".topRatedContainer").innerHTML + `<div class="cell"><img src="images/slider2.jpg"></div>
    <div class="cell1"><p>Date: 23.11.2018<br><br>Title: Fuel is expensive<br><br>Description: Obilne padavine u Radanovićima, preplavljeni putevi, dvorišta...</p></div>
    <div class="cell"><img src="images/slider1.jpg"></div>
    <div class="cell1"><p>Date: 23.11.2018<br><br>Title: Fuel is expensive<br><br>Description: Obilne padavine u Radanovićima, preplavljeni putevi, dvorišta...</p></div>
    `;

    $(".topRatedContainer").innerHTML = output;
})

 fetch(headlineNews)
    .then(checkStatus)
    .then(getJSON)
    .then(function (data) {
        console.log(data);
        let i = 0, br = 0;

            while (br < 3){
                if (data.articles[i].title !== null &&
                    data.articles[i].urlToImage !== null){
            $(`.headline${br+1}`).innerText = `${data.articles[i].title}`;
            $(`.slider${br+1}`).style.backgroundImage = `linear-gradient(
                rgba(0, 0, 0, 0.3),
                rgba(0, 0, 0, 0.3)
              ), url(${data.articles[i].urlToImage})`;
            $(`.textHeadline${br+1}`).innerHTML = `${data.articles[i].description}<a>..read more</a>`;
            br++;
            i++;
            }
            else{
                i++;
            }
        }
    })
    .catch(function (err) {
        console.log("Error ", err);
    })

fetch(flashNews)
    .then(checkStatus)
    .then(getJSON)
    .then(function (data) {
        for(let i = 0; i < 3; i++){
            $(`.flash${i+1}`).innerHTML = `<img src="${data.articles[i].urlToImage}">${data.articles[i].title}<a>Read more</a>`;
            $(`.flash${i+1}`).title = ``;
        }
    })
    .catch(function (err) {
        console.log("Error ", err);
    })

    fetch(topNews)
    .then(checkStatus)
    .then(getJSON)
    .then(function (data) {
        console.log(data);
        for(let i = 0; i < 6; i++){
            $(`.cell${i+1}`).innerHTML = `<img src="${data.articles[i].urlToImage}">`;
            $(`.cellp${i+1}`).innerHTML = `<p>Date: ${data.articles[i].publishedAt.split("T")[0]} <br><br>Title: ${data.articles[i].title}<br><br>Author: ${data.articles[i].author}</p>`;
        }
    })
    .catch(function (err) {
        console.log("Error ", err);
    })