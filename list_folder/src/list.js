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

let getWhole = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
let getNewsArr = [];
let filterArr = new Array(100);
let tempData = [];
let filterWholeArr = [];
let pageCounter = 1;
let checkUrl = "general";

function fillNewsArr(data, br, i, counter) {
    if(data.articles[br+counter].author === null) {data.articles[br+counter].author = "Unknown"};
    getWhole[i][br] = {
        title: data.articles[br+counter].title,
        img: data.articles[br+counter].urlToImage,
        author: data.articles[br+counter].author,
        content: data.articles[br+counter].content,
        date: data.articles[br+counter].publishedAt.split("T")[0]
    }
}

function setDataInHtml(data, pageCounter) {
    let counter = 0;
    for(let i = 0; i < 20; i++) {
        for(let br = 0; br < 5; br++) {
            $class("img"+(br+1))[0].innerHTML = "";
            $class("info"+(br+1))[0].innerHTML = "";
            fillNewsArr(data, br, i, counter);
            $class("img"+(br+1))[0].insertAdjacentHTML("afterbegin", "<img src="+getWhole[pageCounter-1][br].img+" alt="+"News"+br+" Image"+">");
            $class("info"+(br+1))[0].insertAdjacentHTML("afterbegin", "<p>Title: "+getWhole[pageCounter-1][br].title+"</p> <br> <p>Author: "+getWhole[pageCounter-1][br].author+"</p> <br> <p>Date: "+getWhole[pageCounter-1][br].date+"</p>");
        }
        counter += 5;
    }
    fillFilterArr();
}

function fillFilterArr() {
    let counter = 0;
    for(let i = 0; i < 20; i++) {
        for(let j = 0; j < 5; j++) {
            filterArr[counter] = getWhole[i][j];
            counter++;
        }
    }
}

function whichBtn(elem, counter, input, i) {
    if(elem.toLowerCase().includes(input)) {
        tempData[counter] = filterArr[i];
        return true;
    } else {
        return false;
    }
}

function filter() {
    event.preventDefault();
    tempData = [];
    let userInp = $class("search-bar")[0].value.toLowerCase();
    let titleBtn = $class("title-btn")[0];
    let authorBtn = $class("author-btn")[0];
    let counter = 0;
    for(let i = 0; i < filterArr.length; i++) {
        if(userInp === "") {
            return;
        } 
        if(titleBtn.checked) {
            if(whichBtn(filterArr[i].title, counter, userInp, i)) {
                counter++;
            }
            checkUrl = "title";
        } else if(authorBtn.checked) {
            if(whichBtn(filterArr[i].author, counter, userInp, i)) {
                counter++;
            }
            checkUrl = "author";
        } else {
            if(whichBtn(filterArr[i].date, counter, userInp, i)) {
                counter++;
            }
            checkUrl = "date";
        }
    }
    console.log(tempData);
    if(tempData.length === 0) {
        return;
    }
    tempToWhole();
    setFilterArr();
}

function tempToWhole() {
    let counter =  0;
    filterWholeArr = [];
    let num = Math.ceil(tempData.length/5);
    if(num > 5) {
        num = 5;
    }
    for(let i = 0; i < num; i++) {
        let arr = [];
        for(let j = 0; j < 5; j++) {
            if(tempData[counter] !== undefined) {
                arr[j] = tempData[counter];
            }
            counter++;
        }
        filterWholeArr.push(arr);
    }
    console.log(filterWholeArr);
}

function setFilterArr() {
    let num = Math.ceil(tempData.length/5);
    for(let br = 0; br < 5; br++) { 
        if(pageCounter > num) {
            alert("Nema vise stranica!");
            break;
        }
        $class("img"+(br+1))[0].innerHTML = "";
        $class("info"+(br+1))[0].innerHTML = "";
        if(filterWholeArr[pageCounter-1][br] !== undefined) {
            $class("img"+(br+1))[0].insertAdjacentHTML("afterbegin", "<img src="+filterWholeArr[pageCounter-1][br].img+" alt="+"News"+br+" Image"+">");
            $class("info"+(br+1))[0].insertAdjacentHTML("afterbegin", "<p>Title: "+filterWholeArr[pageCounter-1][br].title+"</p> <br> <p>Author: "+filterWholeArr[pageCounter-1][br].author+"</p> <br> <p>Date: "+filterWholeArr[pageCounter-1][br].date+"</p>");
        }
    }
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
$class("submit")[0].addEventListener("click", function() {
    filter();
});

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
    } else if(checkUrl === "sport") {
        fetchIt(sport, pageCounter);
    } else if(checkUrl === "technology") {
        fetchIt(technology, pageCounter);
    } else if(checkUrl === "science") {
        fetchIt(science, pageCounter);
    } else {
        setFilterArr();
    }
    console.log(checkUrl)
});

$class("menu")[0].addEventListener("click", function(){
    $class("menu")[0].classList.toggle("change");
    $class("mobile")[0].classList.toggle("active");
});

firstFetch();