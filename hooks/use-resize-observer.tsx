import { useState, useCallback } from "react";

// Define the hook
function useResizeObserver<T extends HTMLElement>() {
	const [size, setSize] = useState({ width: 0, height: 0 });
	const refCallback = useCallback((node: T | null) => {
		if (!node) return;

		// Create a resize observer instance
		const resizeObserver = new ResizeObserver((entries) => {
			for (let entry of entries) {
				const { width, height } = entry.contentRect;
				setSize({ width, height });
			}
		});

		// Start observing the node
		resizeObserver.observe(node);

		// Cleanup observer on unmount or when the element changes
		return () => resizeObserver.disconnect();
	}, []);

	return { refCallback, ...size };
}

export default useResizeObserver;
