// eslint-disable-next-line import/extensions
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
	// Add more setup options before each test is run
	// setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

	testEnvironment: "jest-environment-jsdom",
	collectCoverage: true,
	collectCoverageFrom: [
		"app/**/*.{js,jsx,ts,tsx}",
		"**/*.{js,jsx,ts,tsx}",
		"!**/*.d.ts",
		"!**/*.ts",
		"!**/node_modules/**",
		"!<rootDir>/out/**",
		"!<rootDir>/.next/**",
		"!<rootDir>/*.config.js",
		"!<rootDir>/coverage/**",
	],
	coverageThreshold: {
		global: {
			lines: 80,
			statements: 80,
		},
	},
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/$1",
	},
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
