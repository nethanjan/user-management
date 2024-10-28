/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Users from "./page";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hook";

jest.mock("next/navigation", () => ({
	useRouter: jest.fn(),
}));

jest.mock("@/hooks/use-fetch-users");

jest.mock("@/store/hook", () => ({
	useAppSelector: jest.fn(),
}));

jest.mock(
	"@/components/layouts/default-layout",
	() =>
		function DefaultLayout({
			children,
			showSidebar,
		}: {
			showSidebar: boolean;
			children: React.ReactNode;
		}) {
			return (
				<div data-testid="default-layout">
					<p>Sidebar is {showSidebar ? "visible" : "hidden"}</p>
					{children}
				</div>
			);
		}
);

jest.mock(
	"@/features/users/table",
	() =>
		function UsersTable({ usersData }: any) {
			return (
				<div data-testid="users-table">
					{usersData.map((user: any) => (
						<div key={user.id}>{user.name}</div>
					))}
				</div>
			);
		}
);

describe("Users page", () => {
	const mockPush = jest.fn();

	beforeEach(() => {
		(useRouter as jest.Mock).mockReturnValue({ push: mockPush });
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("renders loading state initially", () => {
		(useAppSelector as unknown as jest.Mock).mockReturnValue({
			users: [],
			loading: true,
			error: null,
		});

		render(<Users />);

		// Check for loading spinner
		const spinner = screen.getByTestId("loading-spinner");
		expect(spinner).toBeInTheDocument();
	});

	test("renders error state", () => {
		(useAppSelector as unknown as jest.Mock).mockReturnValue({
			users: [],
			loading: false,
			error: "Failed to fetch users",
		});

		render(<Users />);

		// Check for error message
		expect(screen.getByText("Failed to fetch users")).toBeInTheDocument();
	});

	test("renders filtered users", () => {
		(useAppSelector as unknown as jest.Mock).mockReturnValue({
			users: [
				{ id: "1", name: "Alice", email: "alice@example.com" },
				{ id: "2", name: "Bob", email: "bob@example.com" },
				{ id: "3", name: "Charlie", email: "charlie@example.com" },
			],
			loading: false,
			error: null,
		});

		process.env.NEXT_PUBLIC_ENV = "development";

		render(<Users />);

		// Initially all users should be displayed
		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("Bob")).toBeInTheDocument();
		expect(screen.getByText("Charlie")).toBeInTheDocument();

		// Filter users by name
		const nameInput = screen.getByPlaceholderText("Search by name");
		fireEvent.change(nameInput, { target: { value: "Alice" } });

		// Only Alice should be displayed
		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.queryByText("Bob")).not.toBeInTheDocument();
		expect(screen.queryByText("Charlie")).not.toBeInTheDocument();
	});

	test("renders filtered users", () => {
		(useAppSelector as unknown as jest.Mock).mockReturnValue({
			users: [
				{ id: "1", name: "Alice", email: "alice@example.com" },
				{ id: "2", name: "Bob", email: "bob@example.com" },
				{ id: "3", name: "Charlie", email: "charlie@example.com" },
			],
			loading: false,
			error: null,
		});

		render(<Users />);

		// Initially all users should be displayed
		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("Bob")).toBeInTheDocument();
		expect(screen.getByText("Charlie")).toBeInTheDocument();

		// Filter users by email
		const emailInput = screen.getByPlaceholderText("Search by email");
		fireEvent.change(emailInput, { target: { value: "bob@example.com" } });

		// Only Bob should be displayed now
		expect(screen.getByText("Bob")).toBeInTheDocument();
		expect(screen.queryByText("Alice")).not.toBeInTheDocument();
		expect(screen.queryByText("Charlie")).not.toBeInTheDocument();
	});

	test("navigates to add user page on button click", () => {
		(useAppSelector as unknown as jest.Mock).mockReturnValue({
			users: [],
			loading: false,
			error: null,
		});

		render(<Users />);

		// Find the "Add User" button and click it
		const addUserButton = screen.getByRole("button", { name: /add user/i });
		fireEvent.click(addUserButton);

		// Check if router.push was called with "/users/add"
		expect(mockPush).toHaveBeenCalledWith("/users/add");
	});
});
