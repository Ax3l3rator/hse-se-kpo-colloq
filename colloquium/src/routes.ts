import { ValidationChain } from 'express-validator';
import { Controller } from './controllers/Controller';
import { TaskController } from './controllers/TaskController';

export interface Route {
  method: string;
  route: string;
  controller: any;
  action: string;
  validation: ValidationChain[];
}

export const Routes: Route[] = [
  {
    method: 'get',
    route: '/tasks',
    controller: TaskController,
    action: 'getAll',
    validation: [],
  },
];
