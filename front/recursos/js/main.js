import { renderizarClases, filtrarPorNivel, mostrarDetalle } from './funciones.js';

const contenedor = document.getElementById('contenedor');
const botones = document.querySelectorAll('.btn-filtro');

async function cargarDatos() {
  try {
   
    const respuesta = await fetch('/api/clases');

    if (!respuesta.ok) {
      throw new Error("No se pudo cargar el archivo JSON");
    }

    const clases = await respuesta.json();

    inicializar(clases);

  } catch (error) {
    console.error("Error al cargar datos:", error);
  }
}

function inicializar(clases) {

  renderizarClases(clases, contenedor);

  botones.forEach(boton => {
    boton.addEventListener('click', () => {

      botones.forEach(b => b.classList.remove('activo'));
      boton.classList.add('activo');

      const nivel = boton.dataset.nivel;

      const filtradas = filtrarPorNivel(clases, nivel);

      renderizarClases(filtradas, contenedor);
    });
  });

  contenedor.addEventListener('click', e => {
    const btn = e.target.closest('button[data-id]');
    if (!btn) return;

    const idClase = Number(btn.dataset.id);

    const claseSeleccionada = clases.find(c => c.id === idClase);

    if (claseSeleccionada) {
      mostrarDetalle(claseSeleccionada);
    }
  });
}

cargarDatos();


