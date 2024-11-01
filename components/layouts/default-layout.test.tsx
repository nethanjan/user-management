import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import DefaultLayout from "./default-layout"; // Adjust the path as necessary

// Mock the Header and Footer components
jest.mock(
	"../header/header",
	() =>
		function Header() {
			return <header>Mocked Header</header>;
		}
);
jest.mock(
	"../footer/footer",
	() =>
		function Header() {
			return <footer>Mocked Footer</footer>;
		}
);
jest.mock(
	"../navigation/side-navigation",
	() =>
		function SideNav() {
			return <aside>Sidebar</aside>;
		}
);

describe("DefaultLayout Component", () => {
	it("renders Header and Footer", () => {
		render(
			<DefaultLayout showSidebar={false}>
				<p>Test content</p>
			</DefaultLayout>
		);

		// Check if the Header is rendered
		const headerElement = screen.getByText("Mocked Header");
		expect(headerElement).toBeInTheDocument();

		// Check if the Footer is rendered
		const footerElement = screen.getByText("Mocked Footer");
		expect(footerElement).toBeInTheDocument();
	});

	it("renders children inside the main element", () => {
		render(
			<DefaultLayout showSidebar={false}>
				<p>Test content</p>
			</DefaultLayout>
		);

		// Check if the children (Test content) are rendered
		const childrenContent = screen.getByText("Test content");
		expect(childrenContent).toBeInTheDocument();
	});

	it("does not render the sidebar when showSidebar is false", () => {
		render(
			<DefaultLayout showSidebar={false}>
				<p>Test content</p>
			</DefaultLayout>
		);

		// Check if the sidebar is NOT in the document
		const sidebarHeading = screen.queryByText("Left");
		expect(sidebarHeading).not.toBeInTheDocument();
	});

	it("renders the sidebar when showSidebar is true", () => {
		render(
			<DefaultLayout showSidebar={true}>
				<p>Test content</p>
			</DefaultLayout>
		);

		// Check if the sidebar is rendered when showSidebar is true
		const sidebarSubheading = screen.getByText("Sidebar");
		expect(sidebarSubheading).toBeInTheDocument();
	});
});
