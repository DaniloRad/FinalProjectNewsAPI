(function() {
function $class(cl) {
    return document.getElementsByClassName(cl);
}

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

const technology = "https://newsapi.org/v2/everything?q=technology&pagesize=100&apiKey=8720fdbbd7504665a4e56dfa042a5d4c";

let getWhole = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
let getNewsArr = [];
let filterArr = new Array(100);
let tempData = [];
let filterWholeArr = [];
let pageCounter = 1;
let checkUrl = "technology";
let imgCounter = 1;

function fillNewsArr(data, br, i, counter) {
    if(data.articles[br+counter].author === null) {data.articles[br+counter].author = "Unknown"};
    getWhole[i][br] = {
        title: data.articles[br+counter].title,
        img: data.articles[br+counter].urlToImage,
        author: data.articles[br+counter].author,
        content: data.articles[br+counter].content,
        date: data.articles[br+counter].publishedAt.split("T")[0],
        link: data.articles[br+counter].url,
        rate: Math.floor(Math.random()*10+1),
        id: imgCounter
    }
    imgCounter++;
}

function setDataInHtml(data, pageCounter) {
    let counter = 0;
    for(let i = 0; i < 20; i++) {
        for(let br = 0; br < 5; br++) {
            $class("img"+(br+1))[0].innerHTML = "";
            $class("info"+(br+1))[0].innerHTML = "";
            fillNewsArr(data, br, i, counter);
            $class("img"+(br+1))[0].insertAdjacentHTML("afterbegin", `<img src="${getWhole[pageCounter-1][br].img}" alt="News${br}" class="img img${getWhole[pageCounter-1][br].id}">`);
            $class("info"+(br+1))[0].insertAdjacentHTML("afterbegin", `<p>Title: "${getWhole[pageCounter-1][br].title}"</p> <br> <p>Author: "${getWhole[pageCounter-1][br].author}"</p> <br> <p>Date: "${getWhole[pageCounter-1][br].date}"</p> <br> <p>Rate: "${getWhole[pageCounter-1][br].rate}"</p>`);        
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
    if(tempData.length === 0) {
        alert("Nema rezultata za unijeti izraz!");
        return;
    }
    tempToWhole();
    setFilterArr();
}

function filterByRate() {
    tempData = [];
    checkUrl = "rates";
    let counter = 0;
    for(let i = 0; i < filterArr.length; i++) {
        if(Number(event.target.value) <= filterArr[i].rate) {
            tempData[counter] = filterArr[i];
            counter++;
        }
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
                arr[j].id = counter;
            }
            counter++;
        }
        filterWholeArr.push(arr);
    }
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
            $class("img"+(br+1))[0].insertAdjacentHTML("afterbegin", `<img src="${filterWholeArr[pageCounter-1][br].img}" alt="News${br}" "class="img img${filterWholeArr[pageCounter-1][br].id}">`);
            $class("info"+(br+1))[0].insertAdjacentHTML("afterbegin", `<p>Title: "${filterWholeArr[pageCounter-1][br].title}"</p> <br> <p>Author: "${filterWholeArr[pageCounter-1][br].author}"</p> <br> <p>Date: "${filterWholeArr[pageCounter-1][br].date}"</p> <br> <p>Rate: "${filterWholeArr[pageCounter-1][br].rate}"</p>`);
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
    fetchIt(technology, pageCounter);
    $class("prev")[0].style.visibility = "";
    $class("next")[0].style.visibility = "";
}

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
    imgCounter -= 100;
}

$class("pages-inner")[0].addEventListener("click", function() {
    pages();
    if(checkUrl === "technology") {
        fetchIt(technology, pageCounter)
    } else {
        setFilterArr();
    }
});

$class("menu")[0].addEventListener("click", function(){
    $class("menu")[0].classList.toggle("change");
    $class("mobile")[0].classList.toggle("active");
    $class("search")[0].classList.toggle("search-active");
});

$class("rates")[0].addEventListener("mouseup", filterByRate);

$(".columns").addEventListener("click", function(event) {
    if(event.target.classList.contains("img")) {
        let x = parseInt(event.target.className.match(/\d+/g));
        console.log(x)
        getModalData(filterArr, x);
    }
});

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
});

firstFetch();
})();