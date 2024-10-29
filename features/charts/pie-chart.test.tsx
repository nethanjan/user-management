import { render, screen } from "@testing-library/react";

import { User } from "@/types/user";

import PieChart from "./pie-chart";
import "@testing-library/jest-dom";

describe("PieChart component", () => {
	const mockUsers: User[] = [
		{
			id: "1",
			age: 25,
			name: "John Doe",
			email: "johndoe@tmail.com",
			country: "United Kingdom",
			department: "HR",
		},
		{
			id: "2",
			age: 30,
			name: "Jane Smith",
			email: "janesmith@test.ko",
			country: "United States",
			department: "Engineering",
		},
		{
			id: "3",
			age: 25,
			name: "Alice",
			email: "alice@de.lo",
			country: "Germany",
			department: "HR",
		},
		{
			id: "4",
			age: 38,
			name: "Jane Owens",
			email: "janeowens@test.ko",
			country: "Canada",
			department: "Marketing",
		},
		{
			id: "5",
			age: 45,
			name: "Emily",
			email: "emily@de.lo",
			country: "France",
			department: "Sales",
		},
	];

	it("correctly processes user data into department counts", () => {
		render(<PieChart users={mockUsers} />);

		const hrSlice = screen.getByLabelText("Department HR with 2 users");
		const engineeringSlice = screen.getByLabelText(
			"Department Engineering with 1 users"
		);
		const marketingSlice = screen.getByLabelText(
			"Department Marketing with 1 users"
		);
		const salesSlice = screen.getByLabelText("Department Sales with 1 users");

		expect(hrSlice).toBeInTheDocument();
		expect(engineeringSlice).toBeInTheDocument();
		expect(marketingSlice).toBeInTheDocument();
		expect(salesSlice).toBeInTheDocument();
	});

	it("renders a legend with correct colors for each department", () => {
		render(<PieChart users={mockUsers} />);

		const hrLegend = screen.getByText("HR").parentElement;
		const engineeringLegend = screen.getByText("Engineering").parentElement;
		const marketingLegend = screen.getByText("Marketing").parentElement;
		const salesLegend = screen.getByText("Sales").parentElement;

		expect(hrLegend).toHaveStyle({ backgroundColor: "#ef4444" });
		expect(engineeringLegend).toHaveStyle({ backgroundColor: "#4f46e5" });
		expect(marketingLegend).toHaveStyle({ backgroundColor: "#f97316" });
		expect(salesLegend).toHaveStyle({ backgroundColor: "#10b981" });
	});
});
