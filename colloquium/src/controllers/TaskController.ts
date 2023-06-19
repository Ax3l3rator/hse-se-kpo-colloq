import { NextFunction, Request, Response } from 'express';
import { Task } from '../entities/Task';
import { Controller } from './Controller';
import RequestDataSucceed from '../utilities/requestDataSucceed';
import RequestDataError from '../utilities/requestDataError';

export class TaskController extends Controller<Task> {
  constructor(req: Request, res: Response, next: NextFunction) {
    super(Task, req, res, next);
  }

  async getAll() {
    const tasks = await this.repository.find();
    return new RequestDataSucceed(tasks);
  }

  async add() {
    const { name, description } = this.req.body;

    const newTask = this.repository.create({
      name,
      description,
    });
    let saved;
    try {
      saved = await this.repository.save(newTask);
    } catch (error) {
      throw new RequestDataError('Data is wrong', 400);
    }
    return new RequestDataSucceed(saved);
  }

  async getOne() {
    const id = Number(this.req.params.id);

    if (isNaN(id)) {
      throw new RequestDataError('id somehow is NaN', 418);
    }

    const task = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!task) {
      throw new RequestDataError('No tasks with such id', 400);
    }

    return new RequestDataSucceed(task);
  }

  async edit() {
    const id = Number(this.req.params.id);

    if (isNaN(id)) {
      throw new RequestDataError('id somehow is NaN', 418);
    }

    const task = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!task) {
      throw new RequestDataError('No tasks with such id', 400);
    }

    const { name, description, status } = this.req.body;

    await this.repository.update(task.id, { name, description, status });

    return new RequestDataSucceed('Updated successfully');
  }

  async remove() {
    const id = Number(this.req.params.id);

    if (isNaN(id)) {
      throw new RequestDataError('id somehow is NaN', 418);
    }

    try {
      await this.repository.delete(id);
    } catch (err) {
      throw new RequestDataError('No task with this id', 400);
    }

    return new RequestDataSucceed('Deleted successfully');
  }
}
