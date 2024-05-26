import express, { Express, NextFunction, Request, Response } from "express";

import * as authRouter from "./routes/auth";
import * as tasksRouter from "./routes/tasks";
import ExpressError from "./utilities/expressError";

const app: Express = express();

app.use(express.json());

app.use("/auth", authRouter.default);
app.use("/tasks", tasksRouter.default);

app.get("/", (req: Request, res: Response) => {
	res.redirect("/tasks");
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
	next(new ExpressError("Page not found!", 404));
});

app.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
	const { statusCode = 500 } = err;

	if (!err.message) err.message = "Something went wrong!";

	return res.status(statusCode).json({
		message: err.message
	});
});

export default app;
