// Heart.test.js
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Heart from "./heart"; // Adjust the import based on the correct path of your component

describe("Heart Component", () => {
	test("renders with default properties when no props are provided", () => {
		render(<Heart />);

		const svgElement = screen.getByRole("img");
		expect(svgElement).toBeInTheDocument();
	});

	test("applies the correct aria-label when provided", () => {
		const ariaLabel = "Heart Icon";
		render(<Heart aria-label={ariaLabel} />);

		const svgElement = screen.getByLabelText(ariaLabel);
		expect(svgElement).toBeInTheDocument();
	});

	test("applies the correct role when provided", () => {
		const role = "img";
		render(<Heart role={role} />);

		const svgElement = screen.getByRole(role);
		expect(svgElement).toBeInTheDocument();
	});

	test("uses both role and aria-label correctly", () => {
		const ariaLabel = "Favorite Icon";
		const role = "img";
		render(<Heart aria-label={ariaLabel} role={role} />);

		const svgElement = screen.getByRole(role, { name: ariaLabel });
		expect(svgElement).toBeInTheDocument();
	});
});
