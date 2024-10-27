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
	test("renders DefaultLayout with sidebar visible", () => {
		render(<AnalyticsPage />);

		// Verify that the DefaultLayout is rendered with sidebar enabled
		const layoutElement = screen.getByTestId("default-layout");
		expect(layoutElement).toBeInTheDocument();

		// Check if the layout received the correct prop for showing the sidebar
		const sidebarText = screen.getByText("Sidebar is visible");
		expect(sidebarText).toBeInTheDocument();
	});

	test('renders the text "Analytics Page" inside the layout', () => {
		render(<AnalyticsPage />);

		// Verify that the "Users Page" text is rendered inside the DefaultLayout
		const usersPageText = screen.getByText("Analytics Page");
		expect(usersPageText).toBeInTheDocument();
	});
});