import { renderHook, waitFor } from "@testing-library/react";
import { useUsers } from "./use-fetch-users";
import { useAppDispatch } from "@/store/hook";
import { setUsers } from "@/store/slices/user.slice";

global.fetch = jest.fn();

jest.mock("@/store/hook", () => ({
	useAppDispatch: jest.fn(),
}));

describe("useUsers", () => {
	const mockDispatch = jest.fn();

	beforeEach(() => {
		(useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("should dispatch with loading true, empty users, and no error on initial load", async () => {
		(fetch as jest.Mock).mockResolvedValueOnce({
			json: async () => ({ users: [] }),
		});

		renderHook(() => useUsers());

		await waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledWith(
				setUsers({
					users: [],
					loading: false,
					error: null,
				})
			);
		});
	});

	test("should handle fetch error and dispatch error message", async () => {
		(fetch as jest.Mock).mockRejectedValueOnce(new Error("API error"));

		renderHook(() => useUsers());

		await waitFor(() => {
			expect(mockDispatch).toHaveBeenCalledWith(
				setUsers({
					users: [],
					loading: false,
					error: "Failed to fetch users",
				})
			);
		});
	});
});
