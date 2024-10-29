import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";

import Sidebar from "./side-navigation";

import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
	usePathname: jest.fn(),
}));

describe("Sidebar component", () => {
	const mockUsePathname = usePathname as jest.Mock;

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders all links correctly", () => {
		mockUsePathname.mockReturnValue("/"); // Set the pathname to root for this test

		render(<Sidebar />);

		// Check if all the links are rendered
		expect(screen.getByText(/home/i)).toBeInTheDocument();
		expect(screen.getByText(/users/i)).toBeInTheDocument();
		expect(screen.getByText(/add user/i)).toBeInTheDocument();
		expect(screen.getByText(/analytics/i)).toBeInTheDocument();
	});

	it('highlights the Home link when the pathname is "/"', () => {
		mockUsePathname.mockReturnValue("/"); // Set the pathname to root

		render(<Sidebar />);

		const homeLink = screen.getByText(/home/i);

		// Check if the Home link is active (highlighted)
		expect(homeLink).toHaveClass("bg-blue-500");
	});

	it('highlights the Users link when the pathname is "/users"', () => {
		mockUsePathname.mockReturnValue("/users"); // Set the pathname to "/users"

		render(<Sidebar />);

		const usersLink = screen.getByText(/users/i);

		// Check if the Users link is active (highlighted)
		expect(usersLink).toHaveClass("bg-blue-500");
	});

	it('highlights the Add User link when the pathname is "/users/add"', () => {
		mockUsePathname.mockReturnValue("/users/add"); // Set the pathname to "/users/add"

		render(<Sidebar />);

		const addUserLink = screen.getByText(/add user/i);

		// Check if the Add User link is active (highlighted)
		expect(addUserLink).toHaveClass("bg-blue-500");
	});

	it('highlights the Analytics link when the pathname is "/analytics"', () => {
		mockUsePathname.mockReturnValue("/analytics"); // Set the pathname to "/analytics"

		render(<Sidebar />);

		const analyticsLink = screen.getByText(/analytics/i);

		// Check if the Analytics link is active (highlighted)
		expect(analyticsLink).toHaveClass("bg-blue-500");
	});

	it('highlights the Analytics link when the pathname is "/analytics/bar-chart"', () => {
		mockUsePathname.mockReturnValue("/analytics/bar-chart"); // Set the pathname to "/analytics"

		render(<Sidebar />);

		const analyticsLink = screen.getByText(/bar chart/i);

		// Check if the Analytics link is active (highlighted)
		expect(analyticsLink).toHaveClass("bg-blue-500");
	});

	it('highlights the Analytics link when the pathname is "/analytics/pie-chart"', () => {
		mockUsePathname.mockReturnValue("/analytics/pie-chart"); // Set the pathname to "/analytics"

		render(<Sidebar />);

		const analyticsLink = screen.getByText(/pie chart/i);

		// Check if the Analytics link is active (highlighted)
		expect(analyticsLink).toHaveClass("bg-blue-500");
	});

	it('highlights the Analytics link when the pathname is "/analytics/geo-chart"', () => {
		mockUsePathname.mockReturnValue("/analytics/geo-chart"); // Set the pathname to "/analytics"

		render(<Sidebar />);

		const analyticsLink = screen.getByText(/geo chart/i);

		// Check if the Analytics link is active (highlighted)
		expect(analyticsLink).toHaveClass("bg-blue-500");
	});
});
