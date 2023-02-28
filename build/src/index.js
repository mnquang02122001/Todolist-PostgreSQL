"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const TaskRoute_1 = __importDefault(require("./routes/TaskRoute"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
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
    });
});
app.use("/api/v1/tasks", TaskRoute_1.default);
app.use((req, res, next) => {
    const error = new Error("Invalid request! No resource was found!");
    console.log(error);
    return res.status(404).json({
        message: error.message
    });
});
app.listen(PORT, () => {
    console.log("Server is running on port 5000");
});
