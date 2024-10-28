import { render, screen, fireEvent } from "@testing-library/react";
import UsersTable from "./table";
import { User } from "@/types/user";

import "@testing-library/jest-dom";

const usersData: User[] = [
	{
		id: "1",
		name: "Alice",
		age: 25,
		email: "alice@example.com",
		country: "USA",
		department: "Engineering",
	},
	{
		id: "2",
		name: "Bob",
		age: 30,
		email: "bob@example.com",
		country: "Canada",
		department: "Marketing",
	},
	{
		id: "3",
		name: "Charlie",
		age: 35,
		email: "charlie@example.com",
		country: "UK",
		department: "Sales",
	},
];

jest.mock(
	"react-paginate",
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, react/display-name
	() => (props: any) =>
		(
			<div data-testid="paginate-mock">
				<button onClick={() => props.onPageChange({ selected: 0 })}>
					Previous
				</button>
				<button onClick={() => props.onPageChange({ selected: 1 })}>
					Next
				</button>
			</div>
		)
);

describe("UsersTable", () => {
	test("renders table with user data", () => {
		render(<UsersTable usersData={usersData} />);

		// Verify that the users are displayed
		expect(screen.getByText("Alice")).toBeInTheDocument();
		expect(screen.getByText("Bob")).toBeInTheDocument();
		expect(screen.getByText("Charlie")).toBeInTheDocument();
	});

	test("sorts users by name in ascending order", () => {
		render(<UsersTable usersData={usersData} />);

		const nameHeader = screen.getByText("Name");
		fireEvent.click(nameHeader);

		const rows = screen.getAllByRole("row");
		expect(rows[1]).toHaveTextContent("Alice");
		expect(rows[2]).toHaveTextContent("Bob");
		expect(rows[3]).toHaveTextContent("Charlie");
	});

	test("sorts users by email in descending order", () => {
		render(<UsersTable usersData={usersData} />);

		// Click on the Email header twice to sort by email in descending order
		const emailHeader = screen.getByText("Email");
		fireEvent.click(emailHeader); // First click: ascending
		fireEvent.click(emailHeader); // Second click: descending

		// Verify that the users are sorted in descending order by email
		const rows = screen.getAllByRole("row");
		expect(rows[1]).toHaveTextContent("charlie@example.com");
		expect(rows[2]).toHaveTextContent("bob@example.com");
		expect(rows[3]).toHaveTextContent("alice@example.com");
	});

	test("paginates correctly", () => {
		// For this test, you might want to mock more than 10 users
		const usersDataWithMoreEntries: User[] = Array.from(
			{ length: 20 },
			(_, i) => ({
				id: `${i + 1}`,
				name: `User${i + 1}`,
				age: 25,
				email: `user${i + 1}@example.com`,
				country: "USA",
				department: "Engineering",
			})
		);

		render(<UsersTable usersData={usersDataWithMoreEntries} />);

		// Verify that pagination component is rendered
		expect(screen.getByTestId("paginate-mock")).toBeInTheDocument();

		// Verify that the first page users are rendered
		expect(screen.getByText("User1")).toBeInTheDocument();
		expect(screen.queryByText("User11")).not.toBeInTheDocument();

		// Click Next to go to the second page
		const nextButton = screen.getByText("Next");
		fireEvent.click(nextButton);

		// Verify that the users from the second page are displayed
		expect(screen.getByText("User11")).toBeInTheDocument();
		expect(screen.queryByText("User1")).not.toBeInTheDocument();
	});
});
