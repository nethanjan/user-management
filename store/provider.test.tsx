import { render } from "@testing-library/react";
import React from "react";

import ReduxProvider from "./provider";

import "@testing-library/jest-dom";

describe("ReduxProvider", () => {
	it("renders children with Redux store provider", () => {
		const { getByText } = render(
			<ReduxProvider>
				<div>Test Child Component</div>
			</ReduxProvider>
		);

		const childComponent = getByText("Test Child Component");
		expect(childComponent).toBeInTheDocument();
	});
});
