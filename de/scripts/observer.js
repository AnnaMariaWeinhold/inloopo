const headings = document.querySelectorAll("[id^=point]"); // all element whose id begins with "point"
const links = document.querySelectorAll(".toc .toc__link");
// console.log("targets", headings);
// console.log("links", links);

const options = {
  root: document,
  threshold: 1.0,
  rootMargin: "80px 0px 0px 0px"
};

const observer = new IntersectionObserver((entries) => {
  // Each entry describes an intersection change for one observed
  // target element:
  // entry.target
  // entry.isIntersecting
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((link) => {
        // console.log(entry.target.id);
        // console.log(link.getAttribute("href"));
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