const elementos = document.querySelectorAll('.fade-in');

const mostrarAlHacerScroll = () => {
  const alturaVentana = window.innerHeight;
  elementos.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < alturaVentana - 60) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', mostrarAlHacerScroll);
window.addEventListener('load', mostrarAlHacerScroll);

window.addEventListener("scroll", () => {
  document.body.classList.toggle("scrolled", window.scrollY > 80);
});

function actualizarScrollBar() {
  const scrollBar = document.querySelector(".scrollBar");
  if (!scrollBar) return;

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY / maxScroll;

  const porcentaje = scrolled * 100;

  scrollBar.style.setProperty("--scroll-fill", `${porcentaje}%`);
  document.body.classList.add("scrolled");
}

document.addEventListener("scroll", actualizarScrollBar);

document.addEventListener("DOMContentLoaded", actualizarScrollBar);

const btnScroll = document.getElementById("btnScroll");
const iconScroll = document.getElementById("iconScroll");
const header = document.querySelector("header");
const headerHeight = header.offsetHeight;

function updateScrollIcon() {
  const scrolled = window.scrollY;
  const footer = document.querySelector(".footer-crear");
  const footerRect = footer.getBoundingClientRect();
  const footerVisible = footerRect.top < window.innerHeight;
  if (footerVisible) {
    btnScroll.classList.remove("visible");
    return; 
  }

  if (scrolled > headerHeight) {
    btnScroll.classList.add("visible");
  } else {
    btnScroll.classList.remove("visible");
  }

  const atTop = scrolled < 550;

  if (atTop) {
    iconScroll.innerHTML = '<path d="M12 16l-6-6h12z"></path>';
    btnScroll.onclick = () =>
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  } else {
    iconScroll.innerHTML = '<path d="M6 14l6-6 6 6H6z"></path>';
    btnScroll.onclick = () =>
      window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
window.addEventListener("scroll", updateScrollIcon);
updateScrollIcon(); 

