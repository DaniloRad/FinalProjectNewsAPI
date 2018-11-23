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
let headlineTitle = [], headlineImg = [], headlineAuthor = [], headlineContent = [], headlineDate = [], headlineLink = [];
let counter = 0, loadMoreCounter = 7, output = "";
let headlineNews = "https://newsapi.org/v2/top-headlines?country=us&sortBy=popularity&apiKey=61f183b6efeb48cdab07b405197cd533";
let flashNews = "https://newsapi.org/v2/everything?q=apple&apiKey=61f183b6efeb48cdab07b405197cd533";
let topNews = "https://newsapi.org/v2/top-headlines?sources=bbc-news&sortBy=popularity&apiKey=61f183b6efeb48cdab07b405197cd533";


function getHeadlinesData(data,i){
    headlineTitle.push(data.articles[i].title);
    headlineImg.push(data.articles[i].urlToImage);
    headlineAuthor.push(data.articles[i].author);
    headlineContent.push(data.articles[i].content);
    headlineDate.push(data.articles[i].publishedAt.split("T")[0]);
    headlineLink.push(data.articles[i].url);
}

function getHeadlines(data){
    let i = 0, br = 0;
    while (br < 9){
        if (data.articles[i].title !== null &&
            data.articles[i].urlToImage !== null){
                getHeadlinesData(data,i);
    $(`.headline${br+1}`).innerText = `${data.articles[i].title}`;
    $(`.slider${br+1}`).style.backgroundImage = `linear-gradient(
        rgba(0, 0, 0, 0.3),
        rgba(0, 0, 0, 0.3)
      ), url(${data.articles[i].urlToImage})`;
    $(`.textHeadline${br+1}`).innerHTML = `${data.articles[i].description}<a class="a a${br+1}">..read more</a>`;
    br++;
    i++;
    }
    else{
        i++;
    }

    for (let i = 4; i <= 9; i++){
        $(`.slider${i}`).style.display = "none";
    }
}

}

function getFlashNews(data){
    for(let i = 0; i < 3; i++){
        $(`.flash${i+1}`).innerHTML = `<img src="${data.articles[i].urlToImage}">${data.articles[i].title}<a>Read more</a>`;
        $(`.flash${i+1}`).title = ``;
    }
}

function getTopNews(data){
    for(let i = 0; i < data.articles.length; i++){
        let x = document.createElement("div");
        let y = document.createElement("div");
        x.className = `cell${i+1}`;
        y.className = `cellp${i+1}`;
        $(".topRatedContainer").appendChild(x);
        $(".topRatedContainer").appendChild(y);
        $(`.cell${i+1}`).innerHTML = `<img src="${data.articles[i].urlToImage}">`;
        $(`.cellp${i+1}`).innerHTML = `<p><strong>Date: ${data.articles[i].publishedAt.split("T")[0]} <br><br>Title: ${data.articles[i].title}<br><br>Author: ${data.articles[i].author}</strong></p>`;
    }

    for (let i = 7; i <= data.articles.length; i++){
        $(`.cell${i}`).style.display = "none";
        $(`.cellp${i}`).style.display = "none";
    }

}

function rightArrows(){
    for (let i = 0; i < 9; i++){
        $(`.slider${i+1}`).style.display = "none";
    }
        if(counter === 0){
            $(`.slider1`).style.display = "";
            $(`.slider2`).style.display = "";
            $(`.slider3`).style.display = "";
        }
        else if (counter === 1){
            $(`.slider4`).style.display = "";
            $(`.slider5`).style.display = "";
            $(`.slider6`).style.display = "";
        }
        else if (counter === 2){
            $(`.slider7`).style.display = "";
            $(`.slider8`).style.display = "";
            $(`.slider9`).style.display = "";
        }
}

function leftArrows(){
    for (let i = 0; i < 9; i++){
        $(`.slider${i+1}`).style.display = "none";
    }
        if(counter === 0){
            $(`.slider1`).style.display = "";
            $(`.slider2`).style.display = "";
            $(`.slider3`).style.display = "";
        }
        else if (counter === 1){
            $(`.slider4`).style.display = "";
            $(`.slider5`).style.display = "";
            $(`.slider6`).style.display = "";
        }
        else if (counter === 2){
            $(`.slider7`).style.display = "";
            $(`.slider8`).style.display = "";
            $(`.slider9`).style.display = "";
        }
}



$(".btn-loadMore").addEventListener("click", function(){
    for (let i = 0; i < 3; i++){
        $(`.cell${loadMoreCounter+i}`).style.display = "";
        $(`.cellp${loadMoreCounter+i}`).style.display = "";
    }
    loadMoreCounter += 3;
})

fetch(headlineNews)
    .then(checkStatus)
    .then(getJSON)
    .then(function (data) {
        getHeadlines(data);
        console.log(data.articles);
    })
    .catch(function (err) {
        console.log("Error ", err);
    })


fetch(flashNews)
    .then(checkStatus)
    .then(getJSON)
    .then(function (data) {
        getFlashNews(data);
    })
    .catch(function (err) {
        console.log("Error ", err);
    })




fetch(topNews)
    .then(checkStatus)
    .then(getJSON)
    .then(function (data) {
        getTopNews(data);
    })
    .catch(function (err) {
        console.log("Error ", err);
})


$(".arrows").addEventListener("click", function(event){
    if (event.target.classList.contains("fa-angle-right")){
        counter++;
        if (counter === 3){
            counter = 0;
        }
        rightArrows();
    }
    else if(event.target.classList.contains("fa-angle-left")){
        counter--;
        if (counter === -1) {
            counter = 2;
        }
        leftArrows();
    }
})

setInterval(function(){
    counter++;
        if (counter === 3){
            counter = 0;
        }
        rightArrows();
}, 5000);

$(".displaySlider").addEventListener("click", function(event){
    if (event.target.classList.contains("a")){
        console.log(typeof(event.target.parentNode.className.slice(-1)));
        let x = parseInt(event.target.parentNode.className.slice(-1));
        $(".modal").classList.remove("modal-out");
        $(".modal").classList.add("modal-in");
        $(".modal").id = "in";
        $(".modal").style.display = "block";
        $(".modalTitle").innerText = headlineTitle[x-1];
        if(headlineAuthor[x-1] !== null && headlineAuthor[x-1] !== ""){
        $(".modalAuthor").innerHTML = `Author: ${headlineAuthor[x-1]}<span class="modalDate">Date: ${headlineDate[x-1]}</span>`;
        }
        else{
        $(".modalAuthor").innerHTML = `Author: Unknown<span class="modalDate">Date: ${headlineDate[x-1]}</span>`;
        }
        $(".modalImg").src = `${headlineImg[x-1]}`;
        $(".modalContent").innerText = headlineContent[x-1].split("[")[0];
         $(".modalLink").innerHTML = `<a href="${headlineLink[x-1]}" target="_blank">Click Here for More</a>`;
        
    }
})

$(".close").addEventListener("click", function(){
    $(".modal").classList.remove("modal-in");
        $(".modal").classList.add("modal-out");
        $(".modal").id = "out";
    let modalOut = setInterval(function(){
        $(".modal").style.display = "none";
        }, 1000);
    clearInterval(modalOut);
})