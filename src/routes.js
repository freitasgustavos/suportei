import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProviderController from './app/controllers/ProviderController';
import TicketController from './app/controllers/TicketController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import CustomerController from './app/controllers/CustomerController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

routes.get('/providers', ProviderController.index);

routes.get('/tickets', TicketController.index);
routes.get('/tickets/:id', TicketController.show);
routes.post('/tickets', TicketController.store);
routes.put('/tickets/:id', TicketController.update);
routes.delete('/tickets', TicketController.delete);

routes.get('/schedules', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.get('/customers', CustomerController.index);
routes.post('/customers', CustomerController.store);

export default routes;
