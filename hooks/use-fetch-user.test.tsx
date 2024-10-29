import { renderHook, waitFor } from "@testing-library/react";

import { useFetchUser } from "@/hooks/use-fetch-user";

global.fetch = jest.fn();

describe("useFetchUser hook", () => {
	afterEach(() => {
		jest.clearAllMocks(); // Clear mocks after each test
	});

	it("should initially set loading to true", () => {
		(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => ({
				user: { id: "1", name: "John Doe", email: "john@example.com" },
			}),
		});

		const { result } = renderHook(() => useFetchUser("1"));

		expect(result.current.loading).toBe(true);
		expect(result.current.user).toBe(null);
	});

	it("should fetch user data successfully", async () => {
		(fetch as jest.Mock).mockResolvedValue({
			ok: true,
			json: async () => ({
				user: { id: "1", name: "John Doe", email: "john@example.com" },
			}),
		});

		const { result } = renderHook(() => useFetchUser("1"));

		await waitFor(() => {
			expect(result.current.user).toEqual({
				id: "1",
				name: "John Doe",
				email: "john@example.com",
			});
			expect(result.current.loading).toBe(false);
			expect(result.current.error).toBe(null);
		});
	});

	it("should set error state when fetching fails", async () => {
		(fetch as jest.Mock).mockResolvedValue({
			ok: false,
		});

		const { result } = renderHook(() => useFetchUser("1"));

		await waitFor(() => {
			expect(result.current.error).toBe("Failed to fetch user");
			expect(result.current.loading).toBe(false);
			expect(result.current.user).toBe(null);
		});
	});

	it("should handle network error correctly", async () => {
		(fetch as jest.Mock).mockRejectedValue(new Error("Network Error"));

		const { result } = renderHook(() => useFetchUser("1"));

		await waitFor(() => {
			expect(result.current.error).toBe("Failed to fetch user");
			expect(result.current.loading).toBe(false);
			expect(result.current.user).toBe(null);
		});
	});
});
