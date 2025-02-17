import express from 'express';
import { deleteClientByIdController, getClientByIdController, getClientsController, getProductsByClientIdController, updateClientByIdController, updateProductByClientIdController } from '../controllers/clients.controller.js';
import { verifyApiKeyMiddleware, verifyTokenMiddleware } from '../middlewares/auth.middleware.js';

const clientsRouter = express.Router();

clientsRouter.get('/', verifyTokenMiddleware(['user','admin']), getClientsController);
clientsRouter.get('/products/:clientID', verifyTokenMiddleware(['user','admin']), getProductsByClientIdController);
clientsRouter.post('/products/:clientID', verifyTokenMiddleware(['user','admin']), updateProductByClientIdController);
clientsRouter.get('/edit/:clientID', verifyTokenMiddleware(['user','admin']), getClientByIdController);
clientsRouter.post('/edit/:clientID', verifyTokenMiddleware(['user','admin']), updateClientByIdController);
clientsRouter.delete('/edit/:clientID', verifyTokenMiddleware(['user','admin']), deleteClientByIdController);

export default clientsRouter;