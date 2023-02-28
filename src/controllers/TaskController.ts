import {Request, Response, NextFunction} from 'express';
import pool from '../database/db';
import { getAllTasks, getTask, createTask, deleteTask, updateTaskTitle, updateTaskIsDone } from '../queries/TaskQuery';
export const taskController = {
    getAllTasks: async(req: Request, res: Response, next: NextFunction) => {
        try {
            const results = await pool.query(getAllTasks);
            return res.status(200).json({
                metadata: {
                    total: results.rows.length,
                    offset: 0,
                    limit: results.rows.length
                },
                tasks: results.rows
            })
        } catch (error) {
            return res.status(500).json({
                message: error
            })
        }
    },
    getTask: async(req: Request, res: Response, next: NextFunction) => {
        const taskId = req.params.taskId;
        try {
            const result = await pool.query(getTask, [taskId]);
            if(result.rows.length === 0) {
                return res.status(400).json({
                    message: "Task is not existed"
                })
            }
            return res.status(200).json({task: result.rows[0]})
        } catch (error) {
            return res.status(500).json({ message: error });
        }
    },
    createTask: async(req: Request, res: Response, next: NextFunction) => {
        const {title, isDone} = req.body;
        try {
            const results = await pool.query(createTask, [title, isDone]);
            return res.status(200).json({
                message: 'successful',
                task: results.rows[0]
            })
        } catch (error) {
            return res.status(500).json({
                message: error
            })
        }
    },
    updateTaskTitle: async(req: Request, res: Response, next: NextFunction) => {
        const taskId = req.params.taskId;
        const {title} = req.body
        try {
            const results = await pool.query(getTask, [taskId]);
            if(results.rows.length == 0) {
                return res.status(400).json({
                    message: 'Task is not existed'
                })
            }
            const newResults = await pool.query(updateTaskTitle, [title, taskId]);
            return res.status(200).json({
                message: 'successful',
                task: newResults.rows[0]
            })
        } catch (error) {
            return res.status(500).json({
                message: error
            })
        }
    },
    updateTaskIsDone: async(req: Request, res: Response, next: NextFunction) => {
        const taskId = req.params.taskId;
        const {isDone} = req.body
        try {
            const results = await pool.query(getTask, [taskId]);
            if(results.rows.length == 0) {
                return res.status(400).json({
                    message: 'Task is not existed'
                })
            }
            const newResults = await pool.query(updateTaskIsDone, [isDone, taskId]);
            return res.status(200).json({
                message: 'successful',
                task: newResults.rows[0]
            })
        } catch (error) {
            return res.status(500).json({
                message: error
            })
        }
    },
    deleteTask: async(req: Request, res: Response, next: NextFunction) => {
        const taskId = req.params.taskId;
        try {
            const results = await pool.query(getTask, [taskId]);
            if(results.rows.length == 0) {
                return res.status(400).json({
                    message: 'Task is not existed'
                })
            }
            await pool.query(deleteTask, [taskId]);
            return res.status(200).json({
                message: "successful"
            })
        } catch (error) {
            return res.status(500).json({
                message: error
            })
        }
    }

}