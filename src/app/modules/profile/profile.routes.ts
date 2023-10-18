import { Router } from 'express';
import { ProfileController } from './profile.controller';

const router = Router();

router.get('/:userId', ProfileController.myProfile);
router.patch('/:userId', ProfileController.updated);

export const ProfileRoutes = router;
