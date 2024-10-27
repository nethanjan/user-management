import { act, renderHook } from "@testing-library/react";
import { useCreateUser } from "@/hooks/use-create-user";

// Mock the global fetch function
global.fetch = jest.fn();

describe("useCreateUser hook", () => {
	afterEach(() => {
		jest.clearAllMocks(); // Clear mocks after each test
	});

	it("should set loading to true when creating a user", async () => {
		// Mock a successful response
		(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => ({
				id: "1",
				name: "John Doe",
				email: "john@example.com",
			}),
		});

		const { result } = renderHook(() => useCreateUser());

		// Check that loading is initially false
		expect(result.current.loading).toBe(false);

		// Perform the action
		act(() => {
			result.current.createUser({
				name: "John Doe",
				email: "john@example.com",
			});
		});

		// Check that loading is true after the request starts
		expect(result.current.loading).toBe(true);

		// Wait for the request to complete
		await act(async () => {
			await result.current.createUser({
				name: "John Doe",
				email: "john@example.com",
			});
		});

		// Check that loading is false after the request completes
		expect(result.current.loading).toBe(false);
	});

	it("should return data when user is created successfully", async () => {
		// Mock a successful response
		(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => ({
				id: "1",
				name: "John Doe",
				email: "john@example.com",
			}),
		});

		const { result } = renderHook(() => useCreateUser());

		// Perform the action and wait for the response
		let userData;
		await act(async () => {
			userData = await result.current.createUser({
				name: "John Doe",
				email: "john@example.com",
			});
		});

		// Check that no error occurred and user data is returned
		expect(result.current.error).toBe(null);
		expect(userData).toEqual({
			id: "1",
			name: "John Doe",
			email: "john@example.com",
		});
	});

	it("should set error when creating a user fails", async () => {
		// Mock a failed response
		(fetch as jest.Mock).mockResolvedValue({
			ok: false,
		});

		const { result } = renderHook(() => useCreateUser());

		// Perform the action and wait for the failure
		await act(async () => {
			await result.current.createUser({
				name: "John Doe",
				email: "john@example.com",
			});
		});

		// Check that the error state is set correctly
		expect(result.current.error).toBe("Failed to create user");
		expect(result.current.loading).toBe(false);
	});

	it("should handle fetch throwing an error", async () => {
		// Mock fetch throwing an error
		(fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));

		const { result } = renderHook(() => useCreateUser());

		// Perform the action and simulate a network error
		await act(async () => {
			await result.current.createUser({
				name: "John Doe",
				email: "john@example.com",
			});
		});

		// Check that the error is handled properly
		expect(result.current.error).toBe("Failed to create user");
		expect(result.current.loading).toBe(false);
	});
});
