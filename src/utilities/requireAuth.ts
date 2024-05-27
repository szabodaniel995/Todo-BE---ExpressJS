import * as jose from "jose";
import ExpressError from "./expressError";
import { NextFunction, Request, Response } from "express";
import { User } from "../db/models/user.model";

const appSecret = process.env.SECRET;

export const requireAuth = () => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const jwt = req.headers.authorization?.split(" ")[1] || "";

			if (!jwt) {
				throw new ExpressError("This path requires authentication", 401);
			}

			const secret = jose.base64url.decode(appSecret as string);

			const { payload } = await jose.jwtDecrypt(jwt, secret, {
				issuer: "urn:example:issuer",
				audience: "urn:example:audience"
			});

			const authenticated = await User.findAll({
				where: {
					email: payload.userId as string
				}
			});

			if (!authenticated || !authenticated.length) {
				throw new ExpressError("Unauthorized", 403);
			}

			res.locals.userId = payload.userId;

			next();
		} catch (e: any) {
			if (e["code"] === "ERR_JWT_EXPIRED") {
				const err = new ExpressError("The JWT token has expired", 401);
				return next(err);
			}

			if (e["code"] === "ERR_INVALID_ARG_TYPE") {
				const err = new ExpressError("No JWT token provided", 401);
				return next(err);
			}

			if (e["code"] === "ERR_JWE_INVALID") {
				const err = new ExpressError("Invalid JWT token", 403);
				return next(err);
			}

			return next(e);
		}
	};
};
