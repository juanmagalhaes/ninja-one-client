import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig, devices } from "@playwright/test";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

/*
 * This is here as I'm only using it here but if the application server
 * were more robust I would have created an ./src/env/server.ts file with
 * all the env variables that I don't want exposed on the client side.
 *
 * There is a package called "server only" that can be used to prevent
 * prevent leaking server only env variables to the client side for next.js.
 */
const PORT = z
  .string()
  .optional()
  .default("3001")
  .transform((v) => parseInt(v, 10))
  .parse(process.env.PORT);

const isCI = z
  .string()
  .optional()
  .default("false")
  .transform((v) => v === "true")
  .parse(process.env.CI);

const baseURL = `http://127.0.0.1:${PORT}`;

const projects = [
  {
    name: "chromium",
    use: { ...devices["Desktop Chrome"] },
  },

  // Only run these on CI
  // This is to speed up the local development process.
  // I could have used other variables and cli args too
  // but that should be enough for this challenge.
  ...(isCI
    ? [
        {
          name: "firefox",
          use: { ...devices["Desktop Firefox"] },
        },

        {
          name: "webkit",
          use: { ...devices["Desktop Safari"] },
        },
      ]
    : []),
];

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./e2e",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "list",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects,

  // Run your local dev server before starting the tests */
  webServer: {
    command: "pnpm dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
});
