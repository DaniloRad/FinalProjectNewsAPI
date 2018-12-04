(function scrollAbout(){
  const ourMission = document.getElementById("our-mission");
  const sectionB1 = document.getElementById("section-b1");
  const sectionB2 = document.getElementById("gri");
  const sliderTitle = document.getElementById("slider-title");
  const sectionD = document.getElementById("section-d1");
  const sectionE1 = document.getElementById("section-e1");
  const sectionE2 = document.getElementById("section-e2");
  //function that make scroll animations work
  function checkSlide(e) {
    if (window.scrollY > 0) {
      ourMission.classList.add("fade-in");
    }
    if (window.scrollY > 190) {
      sectionB1.classList.add("fade-in");
      sectionB2.classList.add("img-animationRL");
      sectionB1.classList.add("opacity1");
      sectionB2.classList.add("opacity1");
    }
    if (window.scrollY > 579) {
      sliderTitle.classList.add("fade-in");
      sliderTitle.classList.add("img-animationLR");
      sliderTitle.classList.add("opacity1");
    }
    if (window.scrollY > 1425) {
      sectionD.classList.add("fade-in");
      sectionD.classList.add("opacity1");
    }
    if (window.scrollY > 2548) {
      sectionE1.classList.add("fade-in");
      sectionE1.classList.add("img-animationLR");
      sectionE1.classList.add("opacity1");
      sectionE2.classList.add("fade-in");
      sectionE2.classList.add("img-animationRL");
      sectionE2.classList.add("opacity1");
    }
  }
  
  window.addEventListener("scroll", checkSlide);
  
  function $(selector) {
    return document.querySelector(selector);
  }
  
  $(".menu").addEventListener("click", function() {
    $(".menu").classList.toggle("change");
    $(".mobile").classList.toggle("active");
  });
  
})();