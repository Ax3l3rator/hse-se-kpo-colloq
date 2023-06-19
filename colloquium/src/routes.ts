import { ValidationChain, body, param } from 'express-validator';
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
  {
    method: 'post',
    route: '/tasks',
    controller: TaskController,
    action: 'add',
    validation: [
      body('name').exists().isString().trim().notEmpty(),
      body('description').exists().isString().trim().notEmpty(),
    ],
  },
  {
    method: 'get',
    route: '/tasks/:id',
    controller: TaskController,
    action: 'add',
    validation: [param('id').exists().isInt({ min: 1 })],
  },
  {
    method: 'put',
    route: '/tasks/:id',
    controller: TaskController,
    action: 'add',
    validation: [
      param('id').exists().isInt({ min: 1 }),
      body('name').isString().trim().notEmpty(),
      body('description').isString().trim().notEmpty(),
    ],
  },
  {
    method: 'delete',
    route: '/tasks/:id',
    controller: TaskController,
    action: 'add',
    validation: [param('id').exists().isInt({ min: 1 })],
  },
];
