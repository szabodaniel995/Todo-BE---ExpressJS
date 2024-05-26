import ExpressError from "../utilities/expressError";
import { sequelize } from "./db";

export const initializeDb = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");

		console.log("Initializing the database...");

		await sequelize.sync({ force: true });

		console.log("All models were initialized successfully.");
	} catch (error) {
		throw new ExpressError("Unable to connect to the database", 500);
	}
};

export const syncDb = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");

		console.log("Synchronizing the database...");

		await sequelize.dropAllSchemas({});
		await sequelize.sync({ force: true });

		console.log("All models were synchronized successfully.");
	} catch (error) {
		throw new ExpressError("Unable to connect to the database", 500);
	}
};
