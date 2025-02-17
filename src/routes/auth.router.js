import express from 'express';
import { getPersonByIdController, loginController, registerController} from '../controllers/auth.controller.js';
import { verifyApiKeyMiddleware, verifyTokenMiddleware } from '../middlewares/auth.middleware.js';

const authRouter = express.Router();

authRouter.use(verifyApiKeyMiddleware);

authRouter.post('/login', loginController);
authRouter.post('/register', registerController);
authRouter.get('/:personID', verifyTokenMiddleware(['user', 'admin']), getPersonByIdController);
authRouter.get('/verify/:token', /* verifyTokenController */ (req, res) => res.status(200).json({ok: true}));


export default authRouter;