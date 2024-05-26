import express, { NextFunction, Request, Response } from "express";
import { requireAuth } from "../utilities/requireAuth";
import ExpressError from "../utilities/expressError";
import { Task } from "../db/models/task.model";

const router = express.Router();

router.get("/", requireAuth(), async (req: Request, res: Response, next: NextFunction) => {
	try {
		const tasks = await Task.findAll();

		const returnTasks = tasks.map(task => task["dataValues"]);

		res.status(200).json({
			msg: "Task list request received, sending response",
			tasks: returnTasks
		});
	} catch (e) {
		next(e);
	}
});

router.post("/", requireAuth(), async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = res.locals;
	const { title, description } = req.body;

	try {
		await Task.create({ creator: userId, title, description });

		return res.status(201).json({ msg: `Created task in the database` });
	} catch (e) {
		next(e);
	}
});

router.put("/:id", requireAuth(), async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = res.locals;
	const { id } = req.params;
	const { title, description } = req.body;

	try {
		const tasksToUpdate: any = await Task.findAll({
			where: {
				id
			}
		});

		if (tasksToUpdate[0].creator !== userId) {
			throw new ExpressError(`Only the creator of a task is allowed to update it!`, 403);
		}

		await Task.update(
			{ title, description },
			{
				where: {
					id
				}
			}
		);

		return res.status(201).send(`Updated task with id ${id} in the database`);
	} catch (e) {
		next(e);
	}
});

router.delete("/:id", requireAuth(), async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = res.locals;
	const { id } = req.params;

	try {
		const tasksToDelete: any = await Task.findAll({
			where: {
				id
			}
		});

		if (tasksToDelete[0].creator !== userId) {
			throw new ExpressError(`Only the creator of a task is allowed to delete it!`, 403);
		}

		await Task.destroy({
			where: {
				id
			}
		});

		return res.status(200).send(`Deleted task with id ${id} from the database`);
	} catch (e) {
		next(e);
	}
});

export default router;
