/**
 * Jest configuration for unit tests.
 * Only for unit tests. For e2e we're using playwright.
 *
 * @see https://jestjs.io/docs/configuration
 */
import type { Config } from "jest";

const config: Config = {
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  // The root directory that Jest should scan for tests and modules within
  rootDir: "./src",

  // Import alias
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  // The test environment that will be used for testing
  testEnvironment: "jest-environment-node",

  // The glob patterns Jest uses to detect test files
  testMatch: ["src/**/__tests__/**/*.ts", "**/?(*.)+(test).ts"],
};

export default config;
