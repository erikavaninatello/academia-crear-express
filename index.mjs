import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PUERTO = 3000;

const nombreArchivo = fileURLToPath(import.meta.url);
const url = path.dirname(nombreArchivo);

// middleware JSON
app.use(express.json());

app.use(express.static(url + '/front'));

// middleware de prueba
app.use((req, res, next) => {
    console.log(`Petición: ${req.method} ${req.url}`);
    next();
});

// POST contacto
app.post('/', (req, res) => {

    console.log(req.body);

    res.status(201).json({
        mensaje: 'Mensaje recibido'
    });
});

app.listen(PUERTO, () => {
    console.log(`Servidor en http://localhost:${PUERTO}`);
});