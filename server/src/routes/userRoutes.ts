// server\src\routes\userRoutes.ts

import { Router } from 'express';
import { saveUser } from '../controllers/userController';

const router = Router();

router.get('/user/:username', saveUser);

export default router;