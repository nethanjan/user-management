import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import AnalyticsPage from "./page";

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

describe("Analytics page", () => {
	it("renders DefaultLayout with sidebar visible", () => {
		render(<AnalyticsPage />);

		// Verify that the DefaultLayout is rendered with sidebar enabled
		const layoutElement = screen.getByTestId("default-layout");
		expect(layoutElement).toBeInTheDocument();

		// Check if the layout received the correct prop for showing the sidebar
		const sidebarText = screen.getByText("Sidebar is visible");
		expect(sidebarText).toBeInTheDocument();
	});

	it('renders the "Go to Analytics" link with correct href', () => {
		render(<AnalyticsPage />);

		// Find the link with text "Go to Analytics" and check its href
		const ageChartLink = screen.getByRole("link", {
			name: /age/i,
		});
		const departmentChartLink = screen.getByRole("link", {
			name: /departments/i,
		});
		const gepMapLink = screen.getByRole("link", {
			name: /geo map/i,
		});
		expect(ageChartLink).toBeInTheDocument();
		expect(ageChartLink).toHaveAttribute("href", "/analytics/bar-chart");
		expect(departmentChartLink).toBeInTheDocument();
		expect(departmentChartLink).toHaveAttribute("href", "/analytics/pie-chart");
		expect(gepMapLink).toBeInTheDocument();
		expect(gepMapLink).toHaveAttribute("href", "/analytics/geo-chart");
	});

	it("renders links with the correct styles", () => {
		render(<AnalyticsPage />);

		// Check if the "Go to Users" link has the correct class names
		const ageChartLink = screen.getByRole("link", { name: /age/i });
		expect(ageChartLink).toHaveClass(
			"text-blue-800 text-2xl font-bold hover:underline block text-center focus:outline-none focus-visible:outline focus-visible:outline-blue-500"
		);

		// Check if the "Go to Analytics" link has the correct class names
		const departmentChartLink = screen.getByRole("link", {
			name: /departments/i,
		});
		expect(departmentChartLink).toHaveClass(
			"text-blue-800 text-2xl font-bold hover:underline block text-center focus:outline-none focus-visible:outline focus-visible:outline-blue-500"
		);
	});
});
