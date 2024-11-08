import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// Defines route to serve index.html
router.get('/index', (_req, res) =>
    res.sendFile(path.join(__dirname, './index.js'))
);

export default router;
