const menuToggle = document.getElementById("menuToggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("activo");
  menuToggle.textContent = menu.classList.contains("activo") ? "✖" : "☰";
});

const spanAnio = document.getElementById("anio");
if (spanAnio) {
  const añoActual = new Date().getFullYear();
  spanAnio.textContent = añoActual;
}

const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("¡Gracias por contactarte! Nos comunicaremos pronto.");
    form.reset();
  });
}