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

describe("DefaultLayout Component", () => {
	test("renders Header and Footer", () => {
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

	test("renders children inside the main element", () => {
		render(
			<DefaultLayout showSidebar={false}>
				<p>Test content</p>
			</DefaultLayout>
		);

		// Check if the children (Test content) are rendered
		const childrenContent = screen.getByText("Test content");
		expect(childrenContent).toBeInTheDocument();
	});

	test("does not render the sidebar when showSidebar is false", () => {
		render(
			<DefaultLayout showSidebar={false}>
				<p>Test content</p>
			</DefaultLayout>
		);

		// Check if the sidebar is NOT in the document
		const sidebarHeading = screen.queryByText("Left");
		expect(sidebarHeading).not.toBeInTheDocument();
	});

	test("renders the sidebar when showSidebar is true", () => {
		render(
			<DefaultLayout showSidebar={true}>
				<p>Test content</p>
			</DefaultLayout>
		);

		// Check if the sidebar is rendered when showSidebar is true
		const sidebarHeading = screen.getByText("Left");
		const sidebarSubheading = screen.getByText("Sidebar");
		expect(sidebarHeading).toBeInTheDocument();
		expect(sidebarSubheading).toBeInTheDocument();
	});
});
