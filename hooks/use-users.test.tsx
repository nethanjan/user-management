import { renderHook, waitFor } from "@testing-library/react";
import { useUsers } from "./use-users"; // adjust this import to match the file structure

// Mock fetch globally for the tests
global.fetch = jest.fn();

describe("useUsers", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test("should initialize with loading as true and empty users array", async () => {
		(fetch as jest.Mock).mockResolvedValue({
			json: async () => ({ users: [] }),
		});

		const { result } = renderHook(() => useUsers());

		expect(result.current.loading).toBe(true);
		expect(result.current.users).toEqual([]);
		expect(result.current.error).toBeNull();

		await waitFor(() => expect(result.current.loading).toBe(false));

		expect(result.current.loading).toBe(false);
		expect(result.current.users).toEqual([]);
		expect(result.current.error).toBeNull();
	});

	test("should handle fetch error correctly", async () => {
		(fetch as jest.Mock).mockRejectedValueOnce(new Error("API error"));

		// Render the hook in a test environment
		const { result } = renderHook(() => useUsers());

		// Initially, loading should be true
		expect(result.current.loading).toBe(true);
		expect(result.current.users).toEqual([]);
		expect(result.current.error).toBeNull();

		// Wait for the hook to update after the failed fetch
		await waitFor(() => expect(result.current.loading).toBe(false));

		// After the fetch fails, loading should be false, and error should be set
		expect(result.current.users).toEqual([]);
		expect(result.current.error).toBe("Failed to fetch users");
	});
});
