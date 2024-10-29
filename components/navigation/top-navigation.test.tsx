import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";

import TopNavigation from "./top-navigation";

import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
	usePathname: jest.fn(),
}));

describe("TopNavigation component", () => {
	const setPathnameMock = (path: string) => {
		(usePathname as jest.Mock).mockReturnValue(path);
	};

	it("renders all main links", () => {
		setPathnameMock("/");

		render(<TopNavigation />);

		// Check if all main links are rendered
		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Users")).toBeInTheDocument();
		expect(screen.getByText("Analytics")).toBeInTheDocument();
	});

	it("applies active styling to the 'Home' link when on the '/' path", () => {
		setPathnameMock("/");

		render(<TopNavigation />);

		// Check that the "Home" link has the active class
		const homeLink = screen.getByText("Home");
		expect(homeLink).toHaveClass("bg-blue-500");
	});

	it("applies active styling to the 'Users' link when on the '/users' path", () => {
		setPathnameMock("/users");

		render(<TopNavigation />);

		// Check that the "Users" link has the active class
		const usersLink = screen.getByText("Users");
		expect(usersLink).toHaveClass("bg-blue-500");
	});

	it("applies active styling to the 'Add User' sub-link when on the '/users/add' path", () => {
		setPathnameMock("/users/add");

		render(<TopNavigation />);

		// Check that the "Add User" sub-link has the active class
		const addUserLink = screen.getByText("Add User");
		expect(addUserLink).toHaveClass("bg-blue-500");
	});

	it("applies active styling to the 'Analytics' link when on the '/analytics' path", () => {
		setPathnameMock("/analytics");

		render(<TopNavigation />);

		// Check that the "Analytics" link has the active class
		const analyticsLink = screen.getByText("Analytics");
		expect(analyticsLink).toHaveClass("bg-blue-500");
	});

	it("applies active styling to the 'Bar Chart' sub-link when on the '/analytics/bar-chart' path", () => {
		setPathnameMock("/analytics/bar-chart");

		render(<TopNavigation />);

		// Check that the "Bar Chart" sub-link has the active class
		const barChartLink = screen.getByText("Bar Chart");
		expect(barChartLink).toHaveClass("bg-blue-500");
	});

	it("applies active styling to the 'Pie Chart' sub-link when on the '/analytics/pie-chart' path", () => {
		setPathnameMock("/analytics/pie-chart");

		render(<TopNavigation />);

		// Check that the "Pie Chart" sub-link has the active class
		const pieChartLink = screen.getByText("Pie Chart");
		expect(pieChartLink).toHaveClass("bg-blue-500");
	});

	it("applies active styling to the 'Geo Chart' sub-link when on the '/analytics/geo-chart' path", () => {
		setPathnameMock("/analytics/geo-chart");

		render(<TopNavigation />);

		// Check that the "Geo Chart" sub-link has the active class
		const geoChartLink = screen.getByText("Geo Chart");
		expect(geoChartLink).toHaveClass("bg-blue-500");
	});

	it("renders hover styling for inactive links", () => {
		setPathnameMock("/other");

		render(<TopNavigation />);

		// Check that the "Home" link does not have active styling and can have hover styling
		const homeLink = screen.getByText("Home");
		expect(homeLink).not.toHaveClass("bg-blue-500");
		expect(homeLink).toHaveClass("hover:bg-gray-700");
	});
});
