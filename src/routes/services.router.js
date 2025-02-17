import express from 'express';
import { verifyTokenMiddleware} from '../middlewares/auth.middleware.js';
import { 
  createServiceController, 
  deleteServiceByIdController, 
  getServiceByIdController, 
  getServicesBatteryChange, 
  getServicesByClientIdController, 
  getServicesController, 
  getServicesPaymentPending, 
  updateServiceByIdController 
} from '../controllers/services.controller.js';

const servicesRouter = express.Router();

servicesRouter.get('/pending', verifyTokenMiddleware(['user','admin']), getServicesController);
servicesRouter.get('/battery', verifyTokenMiddleware(['user','admin']), getServicesBatteryChange);
servicesRouter.get('/paymentPending', verifyTokenMiddleware(['user','admin']), getServicesPaymentPending);
servicesRouter.get('/edit/:serviceID/:clientID', verifyTokenMiddleware(['user','admin']), getServiceByIdController);
servicesRouter.post('/new/:clientID', verifyTokenMiddleware(['user','admin']), createServiceController);
servicesRouter.post('/edit/:serviceID', verifyTokenMiddleware(['user','admin']), updateServiceByIdController);
servicesRouter.put('/edit/:serviceID', verifyTokenMiddleware(['user','admin']), deleteServiceByIdController);
servicesRouter.get('/:clientID', verifyTokenMiddleware(['user','admin']), getServicesByClientIdController);

export default servicesRouter;