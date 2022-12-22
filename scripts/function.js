// Code for TOC Observer
const headings = document.querySelectorAll("[id^=point]"); // all element whose id begins with "point"
const links = document.querySelectorAll(".toc .toc__link");

const options = {
  root: document,
  threshold: 1.0,
  rootMargin: "80px 0px 0px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((link) => {
        if (`#${entry.target.id}` === link.getAttribute("href")) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  });
}, options);

headings.forEach((heading) => observer.observe(heading));


var isTocShown = false;
// Show TOC when scroll down
window.addEventListener("scroll", showFunction);

function showFunction() {
  if (isTocShown) return;
  if  (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    document.getElementById("toc").style.display = "block";
    isTocShown = true;
  }
}

// Reading Progress Bar
const readingProgress = document.querySelector('.reading-progress');
const footerHeight = 250;
document.addEventListener('scroll', function (e) {
  let w = (document.body.scrollTop || document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight - footerHeight) * 100;
  readingProgress.style.setProperty('width', w + '%');
});

