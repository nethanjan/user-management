import { render, screen } from "@testing-library/react";

import Footer from "./footer"; // Adjust the import based on the correct path of your component
import "@testing-library/jest-dom";

describe("Footer Component", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders the footer element with correct role", () => {
		render(<Footer />);

		const footerElement = screen.getByRole("contentinfo");
		expect(footerElement).toBeInTheDocument();
	});

	it("displays the copyright text", () => {
		render(<Footer />);

		const copyrightText = screen.getByText(/© 2024\. All rights reserved\./i);
		expect(copyrightText).toBeInTheDocument();
	});

	it("contains a heading element", () => {
		render(<Footer />);

		const headingElement = screen.getByRole("heading", { level: 3 });
		expect(headingElement).toHaveTextContent("© 2024. All rights reserved.");
	});
});
