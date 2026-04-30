import express from 'express';

const app = express();
const PUERTO = 3000;

// middleware JSON
app.use(express.json());

// 🔥 SERVIDOR ESTÁTICO (IMPORTANTE)
app.use(express.static('.'));

// middleware de prueba
app.use((req, res, next) => {
    console.log(`Petición: ${req.method} ${req.url}`);
    next();
});

// POST contacto
app.post('/contacto', (req, res) => {

    console.log(req.body);

    res.status(201).json({
        mensaje: 'Mensaje recibido'
    });
});

app.listen(PUERTO, () => {
    console.log(`Servidor en http://localhost:${PUERTO}`);
});