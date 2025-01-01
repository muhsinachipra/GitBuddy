// server\src\routes\userRoutes.ts

import { Router } from 'express';
import { getSortedUsers, saveUser, searchUsers, softDeleteUser, updateUser } from '../controllers/userController';

const router = Router();

router.get('/user/:username', saveUser);
router.delete('/user/:username', softDeleteUser);
router.get('/users/search', searchUsers);
router.put('/user/:username', updateUser);
router.get('/users/sorted', getSortedUsers);

export default router;