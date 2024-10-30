import { render, screen, fireEvent } from "@testing-library/react";

import { User } from "@/types/user";

import BarChart from "./bar-chart";
import "@testing-library/jest-dom";

jest.mock("@/hooks/use-resize-observer", () => () => ({
	refCallback: jest.fn(),
	width: 500,
	height: 400,
}));

Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

describe("BarChart component", () => {
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
	];

	it("renders without crashing and displays the SVG container", () => {
		render(<BarChart users={mockUsers} />);

		// Check that the SVG element is rendered
		expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument();
	});

	it("processes age data into counts correctly", () => {
		render(<BarChart users={mockUsers} />);

		const age25Bar = screen.getByLabelText("Age 25");
		const age30Bar = screen.getByLabelText("Age 30");

		expect(age25Bar).toBeInTheDocument();
		expect(age30Bar).toBeInTheDocument();
	});

	it("displays tooltip with correct information on bar hover", () => {
		render(<BarChart users={mockUsers} />);

		// Hover over a bar for age 25
		const age25Bar = screen.getByLabelText("Age 25");
		fireEvent.mouseMove(age25Bar);

		// Check for tooltip content
		expect(screen.getByText("Age: 25")).toBeInTheDocument();
		expect(screen.getByText("Users: 2")).toBeInTheDocument();

		// Remove hover
		fireEvent.mouseLeave(age25Bar);
		expect(screen.queryByText("Age: 25")).not.toBeInTheDocument();
	});
});
