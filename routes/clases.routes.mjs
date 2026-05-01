import express from 'express';
import { obtenerClases } from '../controllers/clases.controller.mjs';

const router = express.Router();

router.get('/', obtenerClases);

export default router;