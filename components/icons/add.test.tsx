import { render, screen } from "@testing-library/react";
import AddIcon from "./add";

import "@testing-library/jest-dom";

describe("AddIcon component", () => {
	it("renders an SVG icon with correct attributes", () => {
		render(<AddIcon />);

		// Get the SVG element
		const svgElement = screen.getByRole("presentation");

		// Check if the SVG element is rendered
		expect(svgElement).toBeInTheDocument();

		// Check SVG attributes
		expect(svgElement).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
		expect(svgElement).toHaveAttribute("viewBox", "0 0 24 24");
		expect(svgElement).toHaveAttribute("fill", "currentColor");
		expect(svgElement).toHaveAttribute("width", "24px");
		expect(svgElement).toHaveAttribute("height", "24px");
	});
});
