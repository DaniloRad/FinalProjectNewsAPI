function $class(cl) {
    return document.getElementsByClassName(cl);
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

const general = "https://newsapi.org/v2/everything?q=general&pagesize=100&apiKey=8720fdbbd7504665a4e56dfa042a5d4c";
const sport = "https://newsapi.org/v2/everything?q=sport&pagesize=100&apiKey=8720fdbbd7504665a4e56dfa042a5d4c";
const technology = "https://newsapi.org/v2/everything?q=technology&pagesize=100&apiKey=8720fdbbd7504665a4e56dfa042a5d4c";
const science = "https://newsapi.org/v2/everything?q=science&pagesize=100&apiKey=8720fdbbd7504665a4e56dfa042a5d4c";

let getWhole = [first = [], second = [], third = [], fourth = [], fifth = []];
let getNewsArr = [];
let pageCounter = 1;
let checkUrl = "general";

function fillNewsArr(data, br, i, counter) {
    getWhole[i][br] = {
        title: data.articles[br+counter].title,
        img: data.articles[br+counter].urlToImage,
        author: data.articles[br+counter].author,
        content: data.articles[br+counter].content,
        date: data.articles[br+counter].publishedAt.split("T")[0],
        link: data.articles[br+counter].url
    }
}

function setDataInHtml(data, pageCounter) {
    let counter = 0;
    for(let i = 0; i < 5; i++) {
        for(let br = 0; br < 5; br++) {
            $class("img"+(br+1))[0].innerHTML = "";
            $class("info"+(br+1))[0].innerHTML = "";
            fillNewsArr(data, br, i, counter);
            if(getWhole[i][pageCounter-1].author === null) {getWhole[i][br].author = "Unknown"};
            $class("img"+(br+1))[0].insertAdjacentHTML("afterbegin", "<img src="+getWhole[pageCounter-1][br].img+" alt="+"News"+i+" Image"+">");
            $class("info"+(br+1))[0].insertAdjacentHTML("afterbegin", "<p>Title: "+getWhole[pageCounter-1][br].title+"</p> <br> <p>Author: "+getWhole[pageCounter-1][br].author+"</p> <br> <p>Date: "+getWhole[pageCounter-1][br].date+"</p>");
        }
        counter += 5;
    }
}

function filter() {

}

function fetchIt(url, pageCounter) {
    if(isNaN(pageCounter)) {
        pageCounter = 1;
    }
    fetch(url)
    .then(checkStatus)
    .then(getJSON)
    .then(function(data) {
        setDataInHtml(data, pageCounter);
    })
    .catch(function(error) {
        console.log(error);
    });
}

function firstFetch() {
    pageCounter = 1;
    fetchIt(general, pageCounter);
    $class("prev")[0].style.visibility = "";
    $class("next")[0].style.visibility = "";
}

$class("sport")[0].addEventListener("click", function() {
    pageCounter = 1;
    fetchIt(sport, pageCounter);
    checkUrl = "sport";
    $class("prev")[0].style.visibility = "";
    $class("next")[0].style.visibility = "";
});
$class("technology")[0].addEventListener("click", function() {
    pageCounter = 1;
    fetchIt(technology, pageCounter);
    checkUrl = "technology";
    $class("prev")[0].style.visibility = "";
    $class("next")[0].style.visibility = "";
});
$class("science")[0].addEventListener("click", function() {
    pageCounter = 1;
    fetchIt(science, pageCounter);
    checkUrl = "science";
    $class("prev")[0].style.visibility = "";
    $class("next")[0].style.visibility = "";
});
//$class("submit")[0].addEventListener("click",);

function pages() {
    if(event.target.innerHTML === "Prev") {
        pageCounter--;
    } else if(event.target.innerHTML === "Next") {
        pageCounter++;
    } else {
        pageCounter = Number(event.target.innerHTML);
    }
    if(pageCounter <= 1) {
        pageCounter = 1;
        $class("prev")[0].style.visibility = "hidden";
        $class("next")[0].style.visibility = "";
    } else if(pageCounter >= 5) {
        pageCounter = 5;
        $class("next")[0].style.visibility = "hidden";
        $class("prev")[0].style.visibility = "";
    } else {
        $class("prev")[0].style.visibility = "";
        $class("next")[0].style.visibility = "";
    }
}

$class("pages-inner")[0].addEventListener("click", function() {
    pages();
    if(checkUrl === "general") {
        fetchIt(general, pageCounter)
    } else if(checkUrl = "sport") {
        fetchIt(sport, pageCounter);
    } else if(checkUrl = "technology") {
        fetchIt(technology, pageCounter);
    } else {
        fetchIt(science, pageCounter);
    }
})

firstFetch();