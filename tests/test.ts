const request = require("supertest");
import { syncDb } from "../src/db/initializeDb";
import app from "../src/index";

describe("Authentication route works", () => {
	beforeAll(async () => {
		await syncDb();
	});

	afterAll(async () => {
		await syncDb();
	});

	test("Registration works", async () => {
		try {
			const response = await request(app)
				.post("/auth/signup")
				.send({ email: "test@test.com", password: "password" });

			expect(response.statusCode).toBe(201);
		} catch (error: any) {
			throw new Error(error);
		}
	});

	test("Registering the same user twice is not possible", async () => {
		try {
			const response = await request(app)
				.post("/auth/signup")
				.send({ email: "test@test.com", password: "password" });

			expect(response.statusCode).toBe(400);
		} catch (error: any) {
			throw new Error(error);
		}
	});

	test("Logging in with valid credentials works", async () => {
		try {
			const response = await request(app)
				.post("/auth/login")
				.send({ email: "test@test.com", password: "password" });

			expect(response.statusCode).toBe(200);
			expect(response.body.token).toBeDefined();
		} catch (error: any) {
			throw new Error(error);
		}
	});

	test("Logging in with invalid credentials doesn't work", async () => {
		try {
			const response = await request(app)
				.post("/auth/login")
				.send({ email: "notregistered@test.com", password: "password" });

			expect(response.statusCode).toBe(400);
			expect(response.body.token).not.toBeDefined();
		} catch (error: any) {
			throw new Error(error);
		}
	});

	test("Registering with missing credentials is not possible", async () => {
		try {
			const response = await request(app).post("/auth/signup");

			expect(response.statusCode).toBe(400);
		} catch (error: any) {
			throw new Error(error);
		}
	});
});

describe("Tasks route works", () => {
	let userOneToken = "";
	let userTwoToken = "";
	let response = null;

	beforeAll(async () => {
		await syncDb();

		try {
			response = await request(app)
				.post("/auth/signup")
				.send({ email: "test@test.com", password: "password" });

			expect(response.statusCode).toBe(201);

			response = await request(app)
				.post("/auth/signup")
				.send({ email: "testUser2@test.com", password: "password" });

			expect(response.statusCode).toBe(201);

			response = await request(app)
				.post("/auth/login")
				.send({ email: "test@test.com", password: "password" });

			expect(response.statusCode).toBe(200);
			expect(response.body.token).toBeDefined();

			userOneToken = response.body.token;

			response = await request(app)
				.post("/auth/login")
				.send({ email: "testUser2@test.com", password: "password" });

			expect(response.statusCode).toBe(200);
			expect(response.body.token).toBeDefined();

			userTwoToken = response.body.token;
		} catch (error: any) {
			throw new Error(error);
		}
	});

	afterAll(async () => {
		await syncDb();
	});

	test("Accessing the tasks route without a JWT token is not possible", async () => {
		try {
			const response = await request(app).get("/tasks");

			expect(response.statusCode).toBe(401);
		} catch (error: any) {
			throw new Error(error);
		}
	});

	test("Accessing the list of tasks with an invalid JWT token is not possible", async () => {
		try {
			const response = await request(app)
				.get("/tasks")
				.set("Authorization", "Bearer invalidtoken12345");

			expect(response.statusCode).toBe(403);
		} catch (error: any) {
			throw new Error(error);
		}
	});

	test("Creating tasks with a valid JWT token works", async () => {
		try {
			response = await request(app)
				.post("/tasks")
				.set("Authorization", `Bearer ${userOneToken}`)
				.send({ title: "Test task 1", description: "For testing" });

			expect(response.statusCode).toBe(201);

			response = await request(app)
				.post("/tasks")
				.set("Authorization", `Bearer ${userOneToken}`)
				.send({ title: "Test task 2", description: "For testing" });

			expect(response.statusCode).toBe(201);
		} catch (error: any) {
			throw new Error(error);
		}
	});

	test("Accessing the list of tasks with a valid JWT token works", async () => {
		try {
			response = await request(app).get("/tasks").set("Authorization", `Bearer ${userOneToken}`);

			expect(response.statusCode).toBe(200);
			expect(response.body.tasks.length).toBe(2);
		} catch (error: any) {
			throw new Error(error);
		}
	});

	test("Modification/deletion of task created by the user works", async () => {
		try {
			response = await request(app)
				.put("/tasks/1")
				.set("Authorization", `Bearer ${userOneToken}`)
				.send({ title: "Test task 1 new title", description: "For testing" });

			expect(response.statusCode).toBe(201);

			response = await request(app)
				.delete("/tasks/1")
				.set("Authorization", `Bearer ${userOneToken}`);

			expect(response.statusCode).toBe(200);
		} catch (error: any) {
			throw new Error(error);
		}
	});

	test("Only the creator of a task can modify or delete it", async () => {
		try {
			response = await request(app)
				.put("/tasks/2")
				.set("Authorization", `Bearer ${userTwoToken}`)
				.send({ title: "Test task 2 new title", description: "For testing" });

			expect(response.statusCode).toBe(403);

			response = await request(app)
				.delete("/tasks/2")
				.set("Authorization", `Bearer ${userTwoToken}`);

			expect(response.statusCode).toBe(403);
		} catch (error: any) {
			throw new Error(error);
		}
	});
});
