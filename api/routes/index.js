import express from 'express';
import todoRoutes from './todoRoute.js';

const router = express.Router();
const defaultRoutes = [
  {
    path: '/todos',
    route: todoRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
