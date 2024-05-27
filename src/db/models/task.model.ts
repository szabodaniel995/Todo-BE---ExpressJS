import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { TaskAttributes } from "../../../models/task";

export const Task = sequelize.define<Model<TaskAttributes>>("Task", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	creator: {
		type: DataTypes.STRING,
		allowNull: false
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false
	}
});
