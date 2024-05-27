import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";
import { UserAttributes } from "../../../models/user";

export const User = sequelize.define<Model<UserAttributes>>("User", {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	}
});
