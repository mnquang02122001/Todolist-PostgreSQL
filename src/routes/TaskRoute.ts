import {Router} from 'express';
import { taskController } from '../controllers/TaskController';
const router = Router();

router.get("/get", taskController.getAllTasks);
router.get("/get/:taskId", taskController.getTask);
router.post("/create", taskController.createTask);
router.put("/updateTitle/:taskId", taskController.updateTaskTitle);
router.put("/updateIsDone/:taskId", taskController.updateTaskIsDone)
router.delete("/delete/:taskId", taskController.deleteTask);


export default router;

