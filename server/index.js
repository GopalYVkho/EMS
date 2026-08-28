import express from "express";
import cors from "cors";
import router from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import connectToDatabase from "./db/db.js";
import salaryRouter from './routes/salary.js';
import leaveRouter from './routes/Leave.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public/uploads'));
app.use(cors());

app.use("/api/auth",router)
app.use("/api/department",departmentRouter)
app.use("/api/employee",employeeRouter)
app.use("/api/salary",salaryRouter)
app.use("/api/leave",leaveRouter)

await connectToDatabase();

const server = app.listen(PORT);

server.on("listening", () => {
    console.log(`Service is running on Port ${PORT}`);
});

server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Try another PORT in .env.`);
        process.exit(1);
    }

    if (error.code === "EPERM") {
        console.error(`Permission denied while trying to use port ${PORT}.`);
        process.exit(1);
    }

    console.error(error);
    process.exit(1);
});
