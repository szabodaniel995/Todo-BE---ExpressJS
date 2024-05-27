"use strict";

import { DataTypes } from "sequelize";
import { Model } from "sequelize";

export interface TaskAttributes {
	id?: number;
	creator: string;
	title: string;
	description: string;
}

module.exports = (sequelize: any, dataTypes: typeof DataTypes) => {
	class Task extends Model<TaskAttributes> implements TaskAttributes {
		id?: number;
		creator!: string;
		title!: string;
		description!: string;
	}
	Task.init(
		{
			id: {
				type: dataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			creator: {
				type: dataTypes.STRING,
				allowNull: false
			},
			title: {
				type: dataTypes.STRING,
				allowNull: false
			},
			description: {
				type: dataTypes.STRING,
				allowNull: false
			}
		},
		{
			sequelize,
			modelName: "Task"
		}
	);
	return Task;
};
