// server\src\routes\userRoutes.ts

import { RequestHandler, Router } from 'express';
import {
    saveUser,
} from '../controllers/userController';

const router = Router();

// Route definitions
router.get('/user/:username', saveUser as RequestHandler);

export default router;
