import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import clasesRoutes from './routes/clases.routes.mjs';

const app = express();
const PUERTO = 2026;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(__dirname + '/front'));

app.use('/api/clases', clasesRoutes);

app.listen(PUERTO, () => {
    console.log(`Servidor en http://localhost:${PUERTO}`);
});