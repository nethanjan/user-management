import { render, screen } from "@testing-library/react";

import { User } from "@/types/user";

import GeoMapChart from "./geo-map";
import "@testing-library/jest-dom";

jest.mock("@/hooks/use-resize-observer", () => () => ({
	refCallback: jest.fn(),
	width: 600,
}));

describe("GeoMapChart component", () => {
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
			country: "United Kingdom",
			department: "Engineering",
		},
		{
			id: "3",
			age: 22,
			name: "Alice",
			email: "alice@de.lo",
			country: "United States of America",
			department: "Marketing",
		},
		{
			id: "4",
			age: 38,
			name: "Jane Owens",
			email: "janeowens@test.ko",
			country: "Canada",
			department: "Sales",
		},
	];

	it("correctly calculates user counts per country", () => {
		render(<GeoMapChart users={mockUsers} />);

		// Check if the correct number of users per country is displayed
		const afganPath = screen.getByLabelText("Afghanistan without users");
		const ukPath = screen.getByLabelText("United Kingdom with 2 users");
		const usPath = screen.getByLabelText(
			"United States of America with 1 users"
		);
		const canadaPath = screen.getByLabelText("Canada with 1 users");

		expect(afganPath).toBeInTheDocument();
		expect(ukPath).toBeInTheDocument();
		expect(usPath).toBeInTheDocument();
		expect(canadaPath).toBeInTheDocument();
	});
});
