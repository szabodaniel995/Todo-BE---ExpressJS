import express, { NextFunction, Request, Response } from "express";
import * as jose from "jose";
import ExpressError from "../utilities/expressError";
import { User } from "../db/models/user.model";

const router = express.Router();

const appSecret = process.env.SECRET;

export type AuthBody = {
	email: string;
	password: string;
};

router.post("/signup", async (req: Request<AuthBody>, res: Response, next) => {
	const { email, password } = req.body;

	try {
		if (!email || !password) {
			throw new ExpressError("Please provide credentials for registration", 400);
		}

		const user = await User.findAll({
			where: {
				email
			}
		});

		if (user.length) {
			throw new ExpressError("User already registered!", 400);
		}

		await User.create({ email, password });

		return res.status(201).json({ msg: "Registration successful!" });
	} catch (error: any) {
		next(error);
	}
});

router.post("/login", async (req: Request<AuthBody>, res: Response, next: NextFunction) => {
	const { email, password } = req.body;
	const token = email;

	try {
		const user: any = await User.findAll({
			where: {
				email
			}
		});

		if (
			!user.length ||
			!user.find((d: { id: number; email: string; password: string }) => d.password === password)
		) {
			throw new ExpressError("Login failed. Please check provided credentials.", 400);
		}

		const secret = jose.base64url.decode(appSecret as string);
		const jwt = await new jose.EncryptJWT({ userId: token })
			.setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
			.setIssuedAt(Date.now())
			.setIssuer("urn:example:issuer")
			.setAudience("urn:example:audience")
			.setExpirationTime("1h")
			.encrypt(secret);

		res.status(200).json({ token: jwt });
	} catch (error) {
		next(error);
	}
});

export default router;
