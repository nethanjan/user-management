import { act, renderHook } from "@testing-library/react";
import { useUpdateUser } from "@/hooks/use-update-user";

// Mock the global fetch function
global.fetch = jest.fn();

describe("useUpdateUser hook", () => {
	afterEach(() => {
		jest.clearAllMocks(); // Clear mocks after each test
	});

	it("should set loading to true when updating a user", async () => {
		// Mock a successful response
		(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => ({
				id: "1",
				name: "John Doe",
				email: "john@example.com",
			}),
		});

		const { result } = renderHook(() => useUpdateUser());

		// Initially, loading should be false
		expect(result.current.loading).toBe(false);

		// Perform the update action
		await act(async () => {
			result.current.updateUser("1", { name: "John Doe" });
		});

		// Loading should be true during the fetch call and then false after it completes
		expect(result.current.loading).toBe(false);
		expect(fetch).toHaveBeenCalledWith("/api/users/1", expect.anything());
	});

	it("should update user successfully", async () => {
		// Mock a successful response
		(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => ({
				id: "1",
				name: "John Doe",
				email: "john@example.com",
			}),
		});

		const { result } = renderHook(() => useUpdateUser());

		let updatedUser;
		await act(async () => {
			updatedUser = await result.current.updateUser("1", { name: "John Doe" });
		});

		// Check that user is updated successfully
		expect(updatedUser).toEqual({
			id: "1",
			name: "John Doe",
			email: "john@example.com",
		});
		expect(result.current.error).toBe(null);
		expect(result.current.loading).toBe(false);
	});

	it("should handle server errors and set the error state", async () => {
		// Mock a failed response from the server
		(fetch as jest.Mock).mockResolvedValue({
			ok: false,
		});

		const { result } = renderHook(() => useUpdateUser());

		await act(async () => {
			await result.current.updateUser("1", { name: "John Doe" });
		});

		// Check that error is set correctly
		expect(result.current.error).toBe("Failed to update user");
		expect(result.current.loading).toBe(false);
		expect(result.current.updateUser).toBeDefined();
	});

	it("should handle network errors", async () => {
		// Mock fetch throwing a network error
		(fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));

		const { result } = renderHook(() => useUpdateUser());

		await act(async () => {
			await result.current.updateUser("1", { name: "John Doe" });
		});

		// Check that the error state is set and loading is false
		expect(result.current.error).toBe("Failed to update user");
		expect(result.current.loading).toBe(false);
	});
});
