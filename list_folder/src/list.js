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

const general = "https://newsapi.org/v2/everything?q=general&apiKey=8720fdbbd7504665a4e56dfa042a5d4c";
const sport = "https://newsapi.org/v2/everything?q=sport&apiKey=8720fdbbd7504665a4e56dfa042a5d4c";
const technology = "https://newsapi.org/v2/everything?q=technology&apiKey=8720fdbbd7504665a4e56dfa042a5d4c";
const science = "https://newsapi.org/v2/everything?q=science&apiKey=8720fdbbd7504665a4e56dfa042a5d4c";

function setDataInHtml(data) {
    for(let i = 0; i < 5; i++) {
        $class("img"+(i+1))[0].innerHTML = "";
        $class("info"+(i+1))[0].innerHTML = "";
        let title = data.articles[i].title;
        let author = data.articles[i].author;
        let source = data.articles[i].source.name;
        if(author === null) {author = "Unknown"};
        if(source === null) {source = "Unknown"};
        $class("img"+(i+1))[0].insertAdjacentHTML("afterbegin", "<img src="+data.articles[i].urlToImage+" alt="+"News1 Image"+">");
        $class("info"+(i+1))[0].insertAdjacentHTML("afterbegin", "<p>Title: "+title+"</p> <br> <p>Author: "+author+"</p> <br> <p>Source: "+source+"</p>");
    }
}

function fetchIt(url) {
    fetch(url)
    .then(checkStatus)
    .then(getJSON)
    .then(function(data) {
        setDataInHtml(data);
    })
    .catch(function(error) {
        console.log(error);
    });
}

fetchIt(general);

$class("sport")[0].addEventListener("click", function() {
    fetchIt(sport);
});
$class("technology")[0].addEventListener("click", function() {
    fetchIt(technology);
});
$class("science")[0].addEventListener("click", function() {
    fetchIt(science);
});
