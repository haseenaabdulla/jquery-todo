import { TodoService } from '../services/index.js';
import { todoValidation } from '../validations/index.js';
import { handleErrorResponse, handleSuccessResponse } from '../utils/index.js';

export const createTodo = async (req, res) => {
  try {
    const { error } = todoValidation.validate(req.body, {
      allowUnknown: false,
    });
    if (error) {
      return handleErrorResponse(res, 400, error.details[0].message);
    }

    const todo = await TodoService.createTodo(req.body);
    return handleSuccessResponse(res, todo);
  } catch (error) {
    return handleErrorResponse(res, 500, 'Could not create todo.', error);
  }
};

export const getTodos = async (req, res) => {
  try {
    const { search } = req.query;
    let todos;
    if (search) {
      todos = await TodoService.getTodos(search);
    } else {
      todos = await TodoService.getTodos();
    }
    return handleSuccessResponse(res, todos);
  } catch (error) {
    return handleErrorResponse(res, 500, 'Failed to fetch todos.', error);
  }
};

export const getTodoById = async (req, res) => {
  try {
    const todo = await TodoService.getTodoById(req.params.id);
    if (!todo) {
      return handleErrorResponse(res, 404, 'todo not found.');
    }
    return handleSuccessResponse(res, todo);
  } catch (error) {
    return handleErrorResponse(res, 500, 'Failed to fetch Todo.', error);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await TodoService.updateTodo(req.params.id, req.body);
    if (!updatedTodo) {
      return handleErrorResponse(res, 404, 'todo not found.');
    }
    return handleSuccessResponse(res, updatedTodo);
  } catch (error) {
    return handleErrorResponse(res, 500, 'Failed to update Todo.', error);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await TodoService.deleteTodo(req.params.id);
    if (!deletedTodo) {
      return handleErrorResponse(res, 404, 'Todo not found.');
    }
    return handleSuccessResponse(res, deletedTodo);
  } catch (error) {
    return handleErrorResponse(res, 500, 'Failed to todo Project.', error);
  }
};
