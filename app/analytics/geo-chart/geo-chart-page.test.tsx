import { render, screen } from "@testing-library/react";

import { useUsers } from "@/hooks/use-fetch-users";
import { useAppSelector } from "@/store/hook";
import { User } from "@/types/user";

import GeoMapChartPage from "./page";

import "@testing-library/jest-dom";

jest.mock("@/hooks/use-fetch-users");
jest.mock("@/store/hook");

jest.mock(
	"@/features/charts/geo-map",
	() =>
		function GeoMap({ users }: { users: User[] }) {
			return <div>{`Geo map with ${users.length} users`}</div>;
		}
);

describe("GepMapPage", () => {
	beforeEach(() => {
		(useUsers as jest.Mock).mockImplementation(() => {}); // Mock useUsers without specific logic
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders LoadingView when loading is true", () => {
		(useAppSelector as unknown as jest.Mock).mockReturnValue({
			users: [],
			loading: true,
			error: null,
		});

		render(<GeoMapChartPage />);

		const spinner = screen.getByTestId("loading-spinner");
		expect(spinner).toBeInTheDocument();
	});

	it("renders ErrorView with an error message when there is an error", () => {
		const errorMessage = "Failed to fetch users";
		(useAppSelector as unknown as jest.Mock).mockReturnValue({
			users: [],
			loading: false,
			error: errorMessage,
		});

		render(<GeoMapChartPage />);

		expect(screen.getByText(errorMessage)).toBeInTheDocument();
	});

	it("renders GeoMap with users data when loading is false and there is no error", () => {
		const mockUsers = [
			{ id: "1", name: "John Doe" },
			{ id: "2", name: "Jane Smith" },
		];

		(useAppSelector as unknown as jest.Mock).mockReturnValue({
			users: mockUsers,
			loading: false,
			error: null,
		});

		render(<GeoMapChartPage />);

		expect(
			screen.getByText(`Geo map with ${mockUsers.length} users`)
		).toBeInTheDocument();
	});
});
