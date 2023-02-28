"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTaskIsDone = exports.updateTaskTitle = exports.createTask = exports.getTask = exports.getAllTasks = void 0;
exports.getAllTasks = 'SELECT * FROM tasks';
exports.getTask = 'SELECT * FROM tasks WHERE _id = $1';
exports.createTask = 'INSERT INTO tasks (title, "isDone") VALUES($1, $2) RETURNING *';
exports.updateTaskTitle = 'UPDATE tasks SET title = $1 WHERE _id = $2 RETURNING *';
exports.updateTaskIsDone = 'UPDATE tasks SET "isDone" = $1 WHERE _id = $2 RETURNING *';
exports.deleteTask = 'DELETE FROM tasks WHERE _id = $1';
