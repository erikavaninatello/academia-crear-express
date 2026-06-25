document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modalImagen");
  const imgAmpliada = document.getElementById("imgAmpliada");
  const btnCerrar = document.querySelector(".cerrar-img");

  const imagenesGaleria = document.querySelectorAll(".galeria img");
  if (imagenesGaleria.length === 0) return;

  imagenesGaleria.forEach(img => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      imgAmpliada.src = img.src;
      modal.classList.add("activo");
    });
  });

  btnCerrar.addEventListener("click", () => {
    modal.classList.remove("activo");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("activo");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("activo")) {
      modal.classList.remove("activo");
    }
  });
});


