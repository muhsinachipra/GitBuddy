// server\src\routes\userRoutes.ts

import { Router } from 'express';
import { saveUser, searchUsers, softDeleteUser } from '../controllers/userController';

const router = Router();

router.get('/user/search', searchUsers);
router.get('/user/:username', saveUser);
router.delete('/user/:username', softDeleteUser);

export default router;