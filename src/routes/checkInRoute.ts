import { Router } from 'express';
import CheckInController from '@controllers/checkInController';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';

class CheckInRoute implements Routes {
  public path = '/check/';
  public router = Router();
  public signInController = new CheckInController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}:id`, authMiddleware, this.signInController.signInWithId);
  }
}

export default CheckInRoute;
