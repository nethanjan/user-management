import { renderHook, act } from "@testing-library/react";

import useResizeObserver from "./use-resize-observer";

describe("useResizeObserver", () => {
	let observeMock: jest.Mock;
	let disconnectMock: jest.Mock;

	beforeEach(() => {
		observeMock = jest.fn();
		disconnectMock = jest.fn();

		// Mock the ResizeObserver globally
		global.ResizeObserver = jest.fn(() => ({
			observe: observeMock,
			disconnect: disconnectMock,
		})) as unknown as typeof ResizeObserver;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should initialize width and height to 0", () => {
		const { result } = renderHook(() => useResizeObserver());

		// Initial values should be 0 for width and height
		expect(result.current.width).toBe(0);
		expect(result.current.height).toBe(0);
	});

	it("should update width and height when the element resizes", () => {
		const { result } = renderHook(() => useResizeObserver<HTMLDivElement>());

		// Simulate setting the ref to an element
		const mockElement = document.createElement("div");
		act(() => {
			result.current.refCallback(mockElement);
		});

		// Simulate ResizeObserver callback with new dimensions
		act(() => {
			const resizeObserverCallback = (global.ResizeObserver as jest.Mock).mock
				.calls[0][0];
			resizeObserverCallback([{ contentRect: { width: 200, height: 100 } }]);
		});

		// Updated dimensions should be reflected in state
		expect(result.current.width).toBe(200);
		expect(result.current.height).toBe(100);
	});

	it("should observe the element with ResizeObserver", () => {
		const { result } = renderHook(() => useResizeObserver<HTMLDivElement>());

		// Simulate setting the ref to an element
		const mockElement = document.createElement("div");
		act(() => {
			result.current.refCallback(mockElement);
		});

		// Verify that observe was called with the correct element
		expect(observeMock).toHaveBeenCalledWith(mockElement);
	});
});
