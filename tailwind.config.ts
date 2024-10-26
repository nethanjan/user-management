import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				"grey-800": "#354551",
				"grey-400": "#648cac",
				"grey-100": "#b2b6b0",
				"blue-800": "#1c4c74",
				"blue-400": "#0078a7",
				"blue-100": "#6cb4e4",
			},
		},
	},
	plugins: [],
};
export default config;
