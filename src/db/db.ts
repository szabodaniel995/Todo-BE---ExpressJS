import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
	process.env.NODE_ENV === "test"
		? (process.env.test_database as string)
		: (process.env.database as string),
	process.env.db_username as string,
	process.env.db_password as string,
	{
		dialect: "postgres",
		host: process.env.host,
		port: parseInt(process.env.db_port as string)
	}
);
