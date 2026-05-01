//Renderizar clases 
export function renderizarClases(lista, contenedor) {
  contenedor.innerHTML = "";

  lista.forEach(clase => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta");

    tarjeta.innerHTML = `
       <img src="${clase.imagen}" alt="${clase.nombre}">
  
      <div class="contenido">
      <h3>${clase.nombre}</h3>

      <span class="nivel"><strong>Nivel:</strong> ${clase.nivel}</span>

      <h4>Horarios:</h4>
      <ul>
        ${clase.horarios?.map(h => `<li>${h}</li>`).join("") || "<li>No informado</li>"}
      </ul>
    </div>

    <button type="button" data-id="${clase.id}">Ver más</button>`;

    contenedor.appendChild(tarjeta);
  });
}

//Filtro por nivel
export function filtrarPorNivel(lista, nivel) {
  return nivel === "Todos"
    ? lista
    : lista.filter(clase => clase.nivel === nivel);
}

// Mostrar modal con el detalle de cada clase

export function mostrarDetalle(clase) {
  const modal = document.createElement("div");
  modal.classList.add("modal", "activo");

  modal.innerHTML = `
    <div class="modal-contenido">
      <button class="btn-cerrar">&times;</button>

      <img src="${clase.imagen}" alt="${clase.nombre}">

      <h2>${clase.nombre}</h2>

      <p><strong>Nivel:</strong> ${clase.nivel}</p>

      <h4>Horarios:</h4>
      <ul>
        ${clase.horarios?.map(h => `<li>${h}</li>`).join("") || "<li>No informado</li>"}
      </ul>

      <p class="descripcion">
        ${clase.descripcion || "Clase enfocada en técnica, coordinación y expresión corporal."}
      </p>

      <a 
        href="https://api.whatsapp.com/send/?phone=5493512587281&text=Hola!%20Quisiera%20información%20sobre%20${encodeURIComponent(clase.nombre)}"
        target="_blank"
        class="btn-whatsapp">
        Consultar por WhatsApp
      </a>

    </div>
  `;

  document.body.appendChild(modal);

  // Cerrar modal
  modal.addEventListener("click", e => {
    const contenido = modal.querySelector(".modal-contenido");
    // Cerrar solo si se hace clic en el fondo o botón cerrar
    if (e.target === modal || e.target.classList.contains("btn-cerrar")) {
      contenido.classList.add("cerrar-animacion");
      setTimeout(() => modal.remove(), 300);
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const modalClase = document.querySelector(".modal.activo");
    if (modalClase) {
      const contenido = modalClase.querySelector(".modal-contenido");
      contenido.classList.add("cerrar-animacion");
      setTimeout(() => modalClase.remove(), 300);
    }
  }
});

