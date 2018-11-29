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



const headline = [], topRatedNews = [], flash = [];
let counter = 0, loadMoreCounter = 7, output = "", counterMobile = 0, counterTwo = 0;
let headlineNews = "https://newsapi.org/v2/top-headlines?country=it&pageSize=100&apiKey=61f183b6efeb48cdab07b405197cd533";
let flashNews = "https://newsapi.org/v2/everything?q=flash&language=it&pageSize=88&apiKey=61f183b6efeb48cdab07b405197cd533";
let topNews = "https://newsapi.org/v2/everything?sources=ansa&pageSize=48&sortBy=popularity&apiKey=61f183b6efeb48cdab07b405197cd533";


function getHeadlinesData(data,i,br){
    headline[br] = {
    title: data.articles[i].title,
    img: data.articles[i].urlToImage,
    author: data.articles[i].author,
    content: data.articles[i].content,
    date: data.articles[i].publishedAt.split("T")[0] ,
    link: data.articles[i].url
    }
}

function getTopNewsData(data,i){
    topRatedNews[i] = {
    title: data.articles[i].title,
    img: data.articles[i].urlToImage,
    author: data.articles[i].author,
    content: data.articles[i].content,
    date: data.articles[i].publishedAt.split("T")[0] ,
    link: data.articles[i].url
    }
}

function getFlashData(data,i,br){
    flash[br] = {
    title: data.articles[i].title,
    img: data.articles[i].urlToImage,
    author: data.articles[i].author,
    content: data.articles[i].content,
    date: data.articles[i].publishedAt.split("T")[0] ,
    link: data.articles[i].url
    }
}

function getHeadlines(data){
    let i = 0, br = 0;
    while (br < 6){
        if (data.articles[i].title !== null &&
            data.articles[i].urlToImage !== null){
                getHeadlinesData(data,i,br);
    $(`.headline${br+1}`).innerHTML = `${data.articles[i].title} <a class="a a${br+1}">   Read more</a>`;
    $(`.slider${br+1}`).style.backgroundImage = `linear-gradient(
        rgba(0, 0, 0, 0.4),
        rgba(0, 0, 0, 0.4)
      ), url(${data.articles[i].urlToImage})`;
    br++;
    i++;
    }
    else{
        i++;
    }

    for (let i = 4; i <= 6; i++){
        $(`.slider${i}`).style.display = "none";
    }
}

}

function getFlashNews(data){
    let i = 0, br = 0;
    while (br < 6){
        if (data.articles[i].title !== null &&
            data.articles[i].urlToImage !== null){
        getFlashData(data,i,br);
        $(`.flash${br+1}`).innerHTML = `<img class="img img${i+1}" src="${data.articles[i].urlToImage}">${data.articles[i].title}`;
        $(`.flash${br+1}`).title = ``;
        br++;
    i++;
    }
    else{
        i++;
    }
}
}

function getTopNews(data){
    for(let i = 0; i < data.articles.length; i++){
        getTopNewsData(data,i);
        let x = document.createElement("div");
        let y = document.createElement("div");
        x.className = `cell${i+1}`;
        y.className = `cellp${i+1}`;
        $(".topRatedContainer").appendChild(x);
        $(".topRatedContainer").appendChild(y);
        $(`.cell${i+1}`).innerHTML = `<img class="img img${i+1}" src="${data.articles[i].urlToImage}">`;
        $(`.cellp${i+1}`).innerHTML = `<p><strong>Date: ${data.articles[i].publishedAt.split("T")[0]} <br><br>Title: ${data.articles[i].title}<br><br>Author: ${data.articles[i].author}</strong></p>`;
        $(`.cellp${i+1}`).style.color = `${getRandomColor()}`;
    }

    for (let i = 7; i <= data.articles.length; i++){
        $(`.cell${i}`).style.display = "none";
        $(`.cellp${i}`).style.display = "none";
    }

}

function arrows(){
    if (screen.width < 600 || window.innerWidth < 1000){
        for (let i = 0; i < 6; i++){
            if (i !== counterMobile){
                $(`.slider${i+1}`).style.display = "none";    
            }
            else{
                $(`.slider${i+1}`).style.display = ""; 
            }
        }
    }
    else if (window.innerWidth > 1000 && window.innerWidth < 1200) {
        for (let i = 0; i < 6; i++){
            $(`.slider${i+1}`).style.display = "none";
        }

        if(counterTwo === 0){
            $(`.slider1`).style.display = "";
            $(`.slider2`).style.display = "";
        }
        else if (counterTwo === 1){
            $(`.slider3`).style.display = "";
            $(`.slider4`).style.display = "";
        }
        else if (counterTwo === 2){
            $(`.slider5`).style.display = "";
            $(`.slider6`).style.display = "";
        }

    }
    else {
        for (let i = 0; i < 6; i++){
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
    }
    sliderAnimation();
}

$(".btn-loadMore").addEventListener("click", function(){
    for (let i = 0; i < 3; i++){
        $(`.cell${loadMoreCounter+i}`).style.display = "";
        $(`.cellp${loadMoreCounter+i}`).style.display = "";
    }
    loadMoreCounter += 3;
    console.log(loadMoreCounter, topRatedNews.length);
    if(loadMoreCounter > topRatedNews.length - 1){
        $(".btn-loadMore").style.display = "none";
    }
})

fetch(headlineNews)
    .then(checkStatus)
    .then(getJSON)
    .then(function (data) {
        console.log(data);
        getHeadlines(data);
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
        console.log(data);
    })
    .catch(function (err) {
        console.log("Error ", err);
})

function sliderAnimation(){
    $(".displaySlider").classList.remove("animated","fadeIn");
        window.requestAnimationFrame(function() {
            $(".displaySlider").classList.add("animated","fadeIn");
          });
};

function reduceCounter(){
    counter--;
        if (counter === -1) {
            counter = 1;
        }
        counterMobile--;
        if (counterMobile === -1){
            counterMobile = 5;
        }
        counterTwo--;
        if (counterTwo === -1){
            counterTwo = 2;
        }
}

function increaseCounter(){
    counter++;
    if (counter === 2){
        counter = 0;
    }
    counterMobile++;
    if (counterMobile === 6){
        counterMobile = 0;
    }
    counterTwo++;
    if (counterTwo === 3){
        counterTwo = 0;
    }
}

$(".arrows").addEventListener("click", function(event){
    if (event.target.classList.contains("fa-angle-right")){
        increaseCounter();
        arrows();
    }
    else if(event.target.classList.contains("fa-angle-left")){
        reduceCounter();
        arrows();
    }
})

function leftRight(){
    document.onkeydown = function(e){
      if (e.key === "ArrowLeft"){
        reduceCounter();
        arrows();
      }
      else if (e.key === "ArrowRight"){
        increaseCounter();
        arrows();
      }
    }
  }

  function doNothing(){
    document.onkeydown = function(e){
      if (e.key === "ArrowLeft"){
      }
      else if (e.key === "ArrowRight"){
      }
    }
  }

  $(".slider").addEventListener("mouseover", leftRight);
  $(".slider").addEventListener("mouseout", doNothing);

setInterval(function(){
        increaseCounter();
        arrows();
    }, 5000);



function getModalData(array,x){
        $(".modal").classList.remove("modal-out");
        $(".modal").classList.add("modal-in");
        $(".wrapper").classList.add("blocked");
        $("body").classList.add("modal-open");
        $(".modal").id = "in";
        $(".modal").style.display = "block";
        $(".modalTitle").innerText = array[x-1].title;
        if (array[x-1].author !== null && array[x-1].author !== ""){
        $(".modalAuthor").innerHTML = `Author: ${array[x-1].author}<span class="modalDate">Date: ${array[x-1].date}</span>`;
        }
        else{
        $(".modalAuthor").innerHTML = `Author: Unknown<span class="modalDate">Date: ${array[x-1].date}</span>`;
        }
        $(".modalImg").src = `${array[x-1].img}`;
        if (array[x-1].content === null){
            $(".modalContent").innerText = "No content. Sorry!";    
        }
        else{
            $(".modalContent").innerText = array[x-1].content.split("[")[0];
        }
        $(".modalLink").innerHTML = `<a href="${array[x-1].link}" target="_blank">Click Here for More</a>`;
}

$(".displaySlider").addEventListener("click", function(event){
    console.log(event.target.parentNode.className.slice(-1));
    if (event.target.classList.contains("a")){
        let x = parseInt(event.target.parentNode.className.match(/\d+/g));
        getModalData(headline,x);
    }
})

$(".topRatedContainer").addEventListener("click", function(event){
    if (event.target.classList.contains("img")){
        let x = parseInt(event.target.parentNode.className.match(/\d+/g));
        console.log(x);
        getModalData(topRatedNews,x);
    }
})

$(".bestContainer").addEventListener("click", function(event){
    if (event.target.classList.contains("img")){
        let x = parseInt(event.target.parentNode.className.match(/\d+/g));
        getModalData(flash,x);
    }
    if (event.target.classList.contains("flash")){
        let x = parseInt(event.target.className.match(/\d+/g));
        getModalData(flash,x);
    }
})

function closeModal(){
    $(".modal").classList.remove("modal-in");
        $(".modal").classList.add("modal-out");
        $(".wrapper").classList.remove("blocked");
        $("body").classList.remove("modal-open");
        $(".modal").id = "out";
    let modalOut = setInterval(function(){
        $(".modal").style.display = "none";
        }, 1000);
    clearInterval(modalOut);
}

$(".close").addEventListener("click", function(){
    closeModal();
})

document.addEventListener("keydown", function(event){
    if (event.keyCode === 27){
        closeModal();
    }
})

function mediaCheck(){
    if (screen.width < 600 || window.innerWidth < 600){
        for (let i = 0; i < 6; i++){
            if (i !== counterMobile){
                $(`.slider${i+1}`).style.display = "none";    
            }
            else{
                $(`.slider${i+1}`).style.display = ""; 
            }
        }
    }
    else if (window.innerWidth > 1000 && window.innerWidth < 1200) {
        for (let i = 0; i < 6; i++){
            if (i !== counterTwo && (i-1) !== counterTwo){
                $(`.slider${i+1}`).style.display = "none";    
            }
            else{
                $(`.slider${i+1}`).style.display = ""; 
            }
        }
    }
    else{
        for (let i = 4; i <= 6; i++){
            $(`.slider${i}`).style.display = "none";
        }
    }
};

mediaCheck();

window.addEventListener("resize", function(event){
    if (screen.width < 600 || window.innerWidth <= 1000){
        for (let i = 0; i < 6; i++){
            if (i !== counterMobile){
                $(`.slider${i+1}`).style.display = "none";    
            }
            else{
                $(`.slider${i+1}`).style.display = ""; 
            }
        }
    }
    else if (window.innerWidth > 1000 && window.innerWidth < 1200) {
        for (let i = 0; i < 6; i++){
            if (i !== counterTwo && (i-1) !== counterTwo){
                $(`.slider${i+1}`).style.display = "none";    
            }
            else{
                $(`.slider${i+1}`).style.display = ""; 
            }
        }
    }
    else{
        for (let i = 4; i <= 6; i++){
            $(`.slider${i}`).style.display = "none";
        }
        for (let i = 1; i < 4; i++){
            $(`.slider${i}`).style.display = "";
        }
    }
});

function getRandomColor() {
    var letters = '0123456789'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 10)];
    }
    return color;
}

$(".menu").addEventListener("click", function(){
    $(".menu").classList.toggle("change");
    $(".mobile").classList.toggle("active");
});
