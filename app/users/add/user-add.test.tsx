import {
	render,
	screen,
	fireEvent,
	waitFor,
	act,
} from "@testing-library/react";

import { useCreateUser } from "@/hooks/use-create-user";

import AddUser from "./page";

import "@testing-library/jest-dom";

jest.mock("@/hooks/use-create-user", () => ({
	useCreateUser: jest.fn(),
}));

describe("AddUser component", () => {
	const mockCreateUser = jest.fn();

	beforeEach(() => {
		(useCreateUser as jest.Mock).mockReturnValue({
			createUser: mockCreateUser,
			loading: false,
			error: null,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders the form correctly", () => {
		render(<AddUser />);

		expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /add user/i })
		).toBeInTheDocument();
	});

	it("displays loading state when creating a user", () => {
		(useCreateUser as jest.Mock).mockReturnValue({
			createUser: jest.fn(),
			loading: true,
			error: null,
		});

		render(<AddUser />);

		const button = screen.getByRole("button", { name: /processing.../i });
		expect(button).toBeDisabled();
		expect(button).toHaveTextContent("Processing...");
	});

	it("displays success message after user is added", async () => {
		mockCreateUser.mockResolvedValue({
			id: "1",
			name: "John Doe",
			email: "john@example.com",
		});

		render(<AddUser />);

		fireEvent.change(screen.getByLabelText(/name/i), {
			target: { value: "John Doe" },
		});
		fireEvent.change(screen.getByLabelText(/email/i), {
			target: { value: "john@example.com" },
		});

		await act(async () => {
			fireEvent.submit(screen.getByRole("button", { name: /add user/i }));
		});

		await waitFor(() =>
			expect(screen.getByText(/user added successfully/i)).toBeInTheDocument()
		);
	});

	it("displays error message when creating a user fails", async () => {
		const mockCreateUser = jest.fn().mockResolvedValue(null);
		(useCreateUser as jest.Mock).mockReturnValue({
			createUser: mockCreateUser,
			loading: false,
			error: "Failed to add user",
		});

		render(<AddUser />);

		fireEvent.change(screen.getByLabelText(/name/i), {
			target: { value: "Jane Doe" },
		});
		fireEvent.change(screen.getByLabelText(/email/i), {
			target: { value: "jane@example.com" },
		});

		fireEvent.submit(screen.getByRole("button", { name: /add user/i }));

		await waitFor(() => {
			expect(screen.getByText(/failed to add user/i)).toBeInTheDocument();
		});

		expect(mockCreateUser).toHaveBeenCalledWith({
			name: "Jane Doe",
			email: "jane@example.com",
		});
	});

	it("prevents form submission if inputs are empty", () => {
		render(<AddUser />);

		act(() => {
			fireEvent.submit(screen.getByRole("button", { name: /add user/i }));
		});

		expect(mockCreateUser).not.toHaveBeenCalled();
	});
});
