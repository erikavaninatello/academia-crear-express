import { Router } from 'express'
import { autenticar, cerrarSesion } from './autenticacion.mjs'

const router = Router()

/**
 * @swagger
 * /autenticar:
 *   post:
 *     summary: Inicia sesión
 *     description: Recibe usuario y clave, verifica con bcrypt contra el hash almacenado en .env, genera un JWT firmado y lo envía como cookie httpOnly. Redirige a /admin si es correcto o a /login?error=1 si no.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - clave
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: admin
 *               clave:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       '302':
 *         description: Redirige a /admin si las credenciales son correctas, o a /login?error=1 si no
 *       '400':
 *         description: Faltan campos usuario o clave
 */
router.post('/autenticar', autenticar)

/**
 * @swagger
 * /cerrar-sesion:
 *   get:
 *     summary: Cierra la sesión activa
 *     description: Borra la cookie 'token' del navegador y redirige al formulario de login. El JWT no se invalida en el servidor — simplemente deja de enviarse en las peticiones.
 *     tags:
 *       - Autenticación
 *     responses:
 *       '302':
 *         description: Borra la cookie y redirige a /login
 */
router.get('/cerrar-sesion', cerrarSesion)

export default router
