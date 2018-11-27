const current = document.querySelector("#current");
const images = document.querySelectorAll(".images img");
const opacity = 0.6;

/* changes current img src to clicked img src*/ 
images.forEach(img =>
  img.addEventListener("click", e => (current.src = e.target.src))
);



/*adds fade-in class to clicked image and remove class after second*/ 
function fadeIn(){
    current.classList.add('fade-in');
    function remFade(){
        setTimeout(() => current.classList.remove('fade-in'), 1000);
    }
    

    remFade();
}




