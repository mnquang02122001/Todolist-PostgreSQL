import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import taskRouter from './routes/TaskRoute';
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

//Health check
app.get("/tasks", (req, res) => {
    return res.status(200).json({
        data: "test"
    })
})
app.use("/api/v1/tasks", taskRouter)
app.use((req, res, next) => {
    const error = new Error("Invalid request! No resource was found!");
    console.log(error);
    return res.status(404).json({
        message: error.message
    })
})
app.listen(PORT, () => {
    console.log("Server is running on port 5000");
})



