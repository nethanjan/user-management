import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";

import { useFetchUser } from "@/hooks/use-fetch-user";
import { useUpdateUser } from "@/hooks/use-update-user";

import EditUser from "./page";

import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
	useParams: jest.fn(() => ({ id: "1" })),
	usePathname: jest.fn(() => "/users/edit/1"),
}));

jest.mock("@/hooks/use-fetch-user", () => ({
	useFetchUser: jest.fn(),
}));

jest.mock("@/hooks/use-update-user", () => ({
	useUpdateUser: jest.fn(),
}));

describe("EditUser component", () => {
	const mockRouterPush = jest.fn();

	beforeEach(() => {
		(useRouter as jest.Mock).mockReturnValue({
			push: mockRouterPush,
		});

		(useFetchUser as jest.Mock).mockReturnValue({
			user: { id: "1", name: "John Doe", email: "john@example.com" },
			loading: false,
			error: null,
		});

		(useUpdateUser as jest.Mock).mockReturnValue({
			updateUser: jest.fn().mockResolvedValue({}),
			loading: false,
			error: null,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders the EditUser form with user data", () => {
		render(<EditUser />);

		expect(screen.getByLabelText(/name/i)).toHaveValue("John Doe");
		expect(screen.getByLabelText(/email/i)).toHaveValue("john@example.com");
	});

	it("displays loading spinner when data is being fetched", () => {
		(useFetchUser as jest.Mock).mockReturnValue({
			user: null,
			loading: true,
			error: null,
		});

		render(<EditUser />);

		// Check if the loading spinner is displayed
		expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
	});

	it("shows error message when user fetching fails", () => {
		(useFetchUser as jest.Mock).mockReturnValue({
			user: null,
			loading: false,
			error: "Failed to fetch user",
		});

		render(<EditUser />);

		// Check if the error message is displayed
		expect(screen.getByText(/failed to fetch user/i)).toBeInTheDocument();
	});

	it("submits updated user data and redirects on success", async () => {
		const mockUpdateUser = jest.fn().mockResolvedValue({ id: "1" });
		const alertMock = jest.spyOn(window, "alert").mockImplementation();
		(useUpdateUser as jest.Mock).mockReturnValue({
			updateUser: mockUpdateUser,
			loading: false,
			error: null,
		});

		render(<EditUser />);

		// Simulate user interaction: update the name and email fields
		fireEvent.change(screen.getByLabelText(/name/i), {
			target: { value: "Jane Doe" },
		});
		fireEvent.change(screen.getByLabelText(/email/i), {
			target: { value: "jane@example.com" },
		});

		// Simulate form submission
		fireEvent.submit(screen.getByRole("button", { name: /update user/i }));

		// Wait for the update function to be called and for the redirect to occur
		await waitFor(() =>
			expect(mockUpdateUser).toHaveBeenCalledWith("1", {
				name: "Jane Doe",
				email: "jane@example.com",
			})
		);
		expect(mockRouterPush).toHaveBeenCalledWith("/users");
		expect(alertMock).toHaveBeenCalledWith("User updated successfully");

		alertMock.mockRestore();
	});
});
