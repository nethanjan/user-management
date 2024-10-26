import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./header";

describe("Header Component", () => {
	test("renders the header element", () => {
		render(<Header />);

		// Check if the header element is present
		const headerElement = screen.getByRole("banner"); // 'banner' is the role of <header>
		expect(headerElement).toBeInTheDocument();
	});

	test("renders the Heart icon with correct aria-label and role", () => {
		render(<Header />);

		// Check if the Heart icon is rendered with the correct aria-label and role
		const heartIcon = screen.getByRole("img", { name: "Heart logo" });
		expect(heartIcon).toBeInTheDocument();
	});

	test('renders the site title "Heartpace" as a heading', () => {
		render(<Header />);

		// Check if the heading with text "Heartpace" is present
		const headingElement = screen.getByRole("heading", { name: /heartpace/i });
		expect(headingElement).toBeInTheDocument();
		expect(headingElement).toHaveTextContent("Heartpace");
	});

	test('renders the Link component that navigates to the homepage ("/")', () => {
		render(<Header />);

		// Check if the Link component has the correct href
		const linkElement = screen.getByRole("link", { name: /heartpace/i });
		expect(linkElement).toHaveAttribute("href", "/");
	});
});
