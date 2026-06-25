import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger.mjs'
import rutasClases from './modulos/clases/rutas.clases.mjs'
import rutasContacto from './modulos/contacto/rutas.contacto.mjs'
import rutasAutenticacion from './modulos/autenticacion/rutas.autenticacion.mjs'
import { verificarSesion } from './modulos/autenticacion/middleware.autenticacion.mjs'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const app    = express()
const PUERTO = 2026

app.use(cookieParser(process.env.COOKIE_SECRETO))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Login — público
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'front/login.html'))
})

// Rutas de autenticación — públicas
app.use(rutasAutenticacion)

// Swagger — público
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Admin — protegido (antes del static)
app.get('/admin', verificarSesion, (req, res) => {
    res.sendFile(path.join(__dirname, 'front/admin.html'))
})


app.use('/api/clases', rutasClases)
app.use('/api/contacto', verificarSesion, rutasContacto)

// Front público (al final)
app.use(express.static(__dirname + '/front'))

app.listen(PUERTO, () => {
    console.log(`Servidor en http://localhost:${PUERTO}`)
})