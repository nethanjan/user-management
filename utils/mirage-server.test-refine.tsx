import { Response, Server } from "miragejs";
import { makeServer } from "./mirage-server";
import { faker } from "@faker-js/faker";

// Utility function to start and stop server before and after each test
let server: Server;

beforeEach(() => {
	server = makeServer();
});

afterEach(() => {
	server.shutdown();
});

describe("MirageJS server", () => {
	let server: Server;

	beforeAll(() => {
		server = makeServer();
	});

	afterAll(() => {
		server.shutdown();
	});

	it("should create the server instance", () => {
		expect(server).toBeTruthy();
		expect(server.schema).toBeTruthy();
	});

	it("should return a list of users when GET /users is called", async () => {
		const res = await fetch("/api/users");
		const json = await res.json();

		expect(res.status).toBe(200);
		expect(Array.isArray(json.users)).toBe(true);
		expect(json.users.length).toBe(100); // as the server seeds 100 users
	});

	it("should return users with correct attributes", async () => {
		const res = await fetch("/api/users");
		const { users } = await res.json();

		// Check the first user has the expected structure
		const user = users[0];
		expect(user).toHaveProperty("id");
		expect(user).toHaveProperty("name");
		expect(user).toHaveProperty("email");

		// Validate email format
		expect(user.email).toMatch(/^[\w-\.]+@example\.com$/);
	});

	it("should create a user with expected data", async () => {
		const newUser = server.create("user");

		expect(newUser).toHaveProperty("id");
		expect(newUser).toHaveProperty("name");
		expect(newUser).toHaveProperty("email");

		// Check if email matches the expected format (name-based)
		const expectedEmail =
			newUser.name.toLowerCase().replace(/\s/g, ".") + "@example.com";
		expect(newUser.email).toBe(expectedEmail);
	});

	it("should handle /users route and return a 200 response", async () => {
		const res = await fetch("/api/users");

		expect(res.status).toBe(200);
	});

	it("should throw a 404 error for undefined routes", async () => {
		const res = await fetch("/api/unknown");

		expect(res.status).toBe(404);
	});
});
