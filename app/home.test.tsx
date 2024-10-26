// Home.test.js
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";

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

describe("Home Component", () => {
	test("renders without crashing", () => {
		render(<Home />);

		// Check if the layout is rendered
		const layoutElement = screen.getByTestId("default-layout");
		expect(layoutElement).toBeInTheDocument();
	});

	test('renders the "Go to Users" link with correct href', () => {
		render(<Home />);

		// Find the link with text "Go to Users" and check its href
		const usersLink = screen.getByRole("link", { name: /go to users/i });
		expect(usersLink).toBeInTheDocument();
		expect(usersLink).toHaveAttribute("href", "/users");
	});

	test('renders the "Go to Analytics" link with correct href', () => {
		render(<Home />);

		// Find the link with text "Go to Analytics" and check its href
		const analyticsLink = screen.getByRole("link", {
			name: /go to analytics/i,
		});
		expect(analyticsLink).toBeInTheDocument();
		expect(analyticsLink).toHaveAttribute("href", "/analytics");
	});

	test("renders links with the correct styles", () => {
		render(<Home />);

		// Check if the "Go to Users" link has the correct class names
		const usersLink = screen.getByRole("link", { name: /go to users/i });
		expect(usersLink).toHaveClass(
			"text-blue-800 text-2xl font-bold hover:underline block text-center focus:outline-none focus-visible:outline focus-visible:outline-blue-500"
		);

		// Check if the "Go to Analytics" link has the correct class names
		const analyticsLink = screen.getByRole("link", {
			name: /go to analytics/i,
		});
		expect(analyticsLink).toHaveClass(
			"text-blue-800 text-2xl font-bold hover:underline block text-center focus:outline-none focus-visible:outline focus-visible:outline-blue-500"
		);
	});
});
