import { renderizarClases, filtrarPorNivel, mostrarDetalle } from './funciones.js';

const contenedor = document.getElementById('contenedor');
const botones = document.querySelectorAll('.btn-filtro');

async function cargarDatos() {
  try {
    const respuesta = await fetch('./recursos/js/clases.json');

    if (!respuesta.ok) {
      throw new Error("No se pudo cargar el archivo JSON");
    }

    const clases = await respuesta.json();

    inicializar(clases);

  } catch (error) {
    console.error("Error al cargar JSON:", error);
  }
}

// recibe los datos del JSON
function inicializar(clases) {

  renderizarClases(clases, contenedor);

  // Filtros + función callback en cada boton
  botones.forEach(boton => {
    boton.addEventListener('click', () => {

      botones.forEach(b => b.classList.remove('activo'));
      boton.classList.add('activo');

      const nivel = boton.dataset.nivel;

      // callback - filtrarPorNivel()
      const filtradas = filtrarPorNivel(clases, nivel);

      // render con los datos filtrados
      renderizarClases(filtradas, contenedor);
    });
  });

  // Modal 
  contenedor.addEventListener('click', e => {
    const btn = e.target.closest('button[data-id]');
    if (!btn) return;

    const idClase = Number(btn.dataset.id);

    // callback para encontrar la clase
    const claseSeleccionada = clases.find(c => c.id === idClase);

    if (claseSeleccionada) {
      mostrarDetalle(claseSeleccionada);
    }
  });
}

// Ejecutar la carga
cargarDatos();




