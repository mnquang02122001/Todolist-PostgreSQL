"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const db_1 = __importDefault(require("../database/db"));
const TaskQuery_1 = require("../queries/TaskQuery");
exports.taskController = {
    getAllTasks: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const results = yield db_1.default.query(TaskQuery_1.getAllTasks);
            return res.status(200).json({
                metadata: {
                    total: results.rows.length,
                    offset: 0,
                    limit: results.rows.length
                },
                tasks: results.rows
            });
        }
        catch (error) {
            return res.status(500).json({
                message: error
            });
        }
    }),
    getTask: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const taskId = req.params.taskId;
        try {
            const result = yield db_1.default.query(TaskQuery_1.getTask, [taskId]);
            if (result.rows.length === 0) {
                return res.status(400).json({
                    message: "Task is not existed"
                });
            }
            return res.status(200).json({ task: result.rows[0] });
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    }),
    createTask: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, isDone } = req.body;
        try {
            const results = yield db_1.default.query(TaskQuery_1.createTask, [title, isDone]);
            return res.status(200).json({
                message: 'successful',
                task: results.rows[0]
            });
        }
        catch (error) {
            return res.status(500).json({
                message: error
            });
        }
    }),
    updateTaskTitle: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const taskId = req.params.taskId;
        const { title } = req.body;
        try {
            const results = yield db_1.default.query(TaskQuery_1.getTask, [taskId]);
            if (results.rows.length == 0) {
                return res.status(400).json({
                    message: 'Task is not existed'
                });
            }
            const newResults = yield db_1.default.query(TaskQuery_1.updateTaskTitle, [title, taskId]);
            return res.status(200).json({
                message: 'successful',
                task: newResults.rows[0]
            });
        }
        catch (error) {
            return res.status(500).json({
                message: error
            });
        }
    }),
    updateTaskIsDone: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const taskId = req.params.taskId;
        const { isDone } = req.body;
        try {
            const results = yield db_1.default.query(TaskQuery_1.getTask, [taskId]);
            if (results.rows.length == 0) {
                return res.status(400).json({
                    message: 'Task is not existed'
                });
            }
            const newResults = yield db_1.default.query(TaskQuery_1.updateTaskIsDone, [isDone, taskId]);
            return res.status(200).json({
                message: 'successful',
                task: newResults.rows[0]
            });
        }
        catch (error) {
            return res.status(500).json({
                message: error
            });
        }
    }),
    deleteTask: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const taskId = req.params.taskId;
        try {
            const results = yield db_1.default.query(TaskQuery_1.getTask, [taskId]);
            if (results.rows.length == 0) {
                return res.status(400).json({
                    message: 'Task is not existed'
                });
            }
            yield db_1.default.query(TaskQuery_1.deleteTask, [taskId]);
            return res.status(200).json({
                message: "successful"
            });
        }
        catch (error) {
            return res.status(500).json({
                message: error
            });
        }
    })
};
