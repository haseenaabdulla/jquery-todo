import { Todo } from '../models/index.js';

export default class TodoService {
  static async createTodo(data) {
    return Todo.create(data);
  }

  static async getTodos(search = '') {
    // Define a query object to perform a search on all fields
    const searchQuery = {
      $or: [
        { title: { $regex: search, $options: 'i' } }, // Case-insensitive search in the 'name' field
      ],
    };

    return Todo.find(searchQuery);
  }

  static async getTodoById(todoId) {
    return Todo.findById(todoId);
  }

  static async updateTodo(todoId, updatedData) {
    return Todo.findByIdAndUpdate(todoId, updatedData, {
      new: true,
    });
  }

  static async deleteTodo(todoId) {
    return Todo.findByIdAndRemove(todoId);
  }
}
