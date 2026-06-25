import { Router } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'
import { verificarSesion } from '../autenticacion/middleware.autenticacion.mjs'
import {
  obtenerClases,
  obtenerClasesPorNivel,
  obtenerClasePorId,
  crearClase,
  actualizarClase,
  eliminarClase,
} from './controlador.clases.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

// Configuración de Multer: dónde y cómo guardar las imágenes
const almacenamiento = multer.diskStorage({

  // Carpeta destino dentro del proyecto
  destination: (req, archivo, cb) => {
    cb(null, path.join(__dirname, '../../front/recursos/imagenes'))
  },

  // Nombre: timestamp + nombre original para evitar duplicados
  filename: (req, archivo, cb) => {
    cb(null, Date.now() + '-' + archivo.originalname)
  }
})

// Solo acepta archivos de imagen (jpg, png, webp, etc.)
const filtroArchivo = (req, archivo, cb) => {
  if (archivo.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Solo se permiten imágenes'), false)
  }
}

// Límite de 5MB por imagen
const subida = multer({ storage: almacenamiento, fileFilter: filtroArchivo, limits: { fileSize: 5 * 1024 * 1024 } })

const router = Router()

/**
 * @swagger
 * /api/clases:
 *   get:
 *     summary: Obtiene todas las clases
 *     tags:
 *       - Clases
 *     responses:
 *       '200':
 *         description: Lista de clases
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/', obtenerClases)

/**
 * @swagger
 * /api/clases/nivel/{nivel}:
 *   get:
 *     summary: Obtiene clases filtradas por nivel
 *     tags:
 *       - Clases
 *     parameters:
 *       - in: path
 *         name: nivel
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de clases del nivel indicado
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/nivel/:nivel', obtenerClasesPorNivel)

/**
 * @swagger
 * /api/clases/{id}:
 *   get:
 *     summary: Obtiene una clase por id
 *     tags:
 *       - Clases
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Clase encontrada
 *       '404':
 *         description: Clase no encontrada
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/:id', obtenerClasePorId)

/**
 * @swagger
 * /api/clases:
 *   post:
 *     summary: Crea una clase
 *     tags:
 *       - Clases
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               nivel:
 *                 type: string
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Clase creada
 *       '400':
 *         description: Datos invalidos
 *       '500':
 *         description: Error interno del servidor
 */
// upload.single('imagen') intercepta el archivo antes de que llegue al controlador
router.post('/',verificarSesion, subida.single('imagen'), crearClase)

/**
 * @swagger
 * /api/clases/{id}:
 *   put:
 *     summary: Actualiza una clase por id
 *     tags:
 *       - Clases
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               nivel:
 *                 type: string
 *               imagen:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: Clase actualizada
 *       '404':
 *         description: Clase no encontrada
 *       '500':
 *         description: Error interno del servidor
 */
// upload.single('imagen') intercepta el archivo antes de que llegue al controlador
router.put('/:id', verificarSesion,subida.single('imagen'), actualizarClase)

/**
 * @swagger
 * /api/clases/{id}:
 *   delete:
 *     summary: Elimina una clase por id
 *     tags:
 *       - Clases
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Clase eliminada
 *       '404':
 *         description: Clase no encontrada
 *       '500':
 *         description: Error interno del servidor
 */
router.delete('/:id',verificarSesion, eliminarClase)

export default router
