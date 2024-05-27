"use strict";

import { DataTypes } from "sequelize";
import { Model } from "sequelize";

export interface UserAttributes {
	id?: number;
	email: string;
	password: string;
}

module.exports = (sequelize: any, dataTypes: typeof DataTypes) => {
	class User extends Model<UserAttributes> implements UserAttributes {
		id?: number;
		email!: string;
		password!: string;
	}
	User.init(
		{
			id: { type: dataTypes.INTEGER, autoIncrement: true, primaryKey: true },
			email: { type: dataTypes.STRING, allowNull: false },
			password: { type: dataTypes.STRING, allowNull: false }
		},
		{
			sequelize,
			modelName: "User"
		}
	);
	return User;
};
