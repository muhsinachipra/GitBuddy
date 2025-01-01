// server\src\routes\userRoutes.ts

import { Router } from 'express';
import { getSortedUsers, saveUser, searchUsers, softDeleteUser, updateUser } from '../controllers/userController';
import { validateUser } from '../middlewares/validationMiddleware';

const router = Router();

router.get('/users/search', searchUsers);
router.get('/users/sorted', getSortedUsers);
router.get('/user/:username', validateUser, saveUser);
router.delete('/user/:username', softDeleteUser);
router.put('/user/:username', updateUser);

export default router;