"use strict";

import fs from "fs";
import path from "path";
import process from "process";
import { DataTypes, Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const basename = path.basename(__filename);
const db: Record<string, any> = {};

const sequelize = new Sequelize(
	process.env.database as string,
	process.env.db_username as string,
	process.env.db_password as string,
	{
		dialect: "postgres",
		host: process.env.host,
		port: parseInt(process.env.db_port as string)
	}
);

fs.readdirSync(__dirname)
	.filter(file => {
		return (
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".ts" &&
			file.indexOf(".test.js") === -1 &&
			file.indexOf(".test.ts") === -1
		);
	})
	.forEach(file => {
		const model = require(path.join(__dirname, file))(sequelize, DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
