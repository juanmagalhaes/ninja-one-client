/*
 * I decided to use e2e tests for UI testing cause they have
 * in my opinion they have a higher coverage level as they
 * touch all layers of the application, calling APIs directly etc.
 *
 * I prefer this than doing unit testing and creating a lot of mocks
 * that easily get outdated.
 *
 * Of course in a real application we would need to set up an instance
 * of the API and the database to run these tests. Have scripts to seed the
 * DB with data and clean it up afterwards as needed.
 */
import { expect, test } from "@playwright/test";

const { describe } = test;

describe("Devices page", () => {
  describe("Smoke test", () => {
    test("Device page is visble", async ({ page }) => {
      await page.goto("/devices");

      await expect(page).toHaveTitle(
        "NinjaOne - Devices List - View and manage your devices",
      );

      await expect(page).toHaveURL("/devices");

      const heading = page.getByRole("heading", { name: "Devices" });

      // Expects page to have a heading with the name of Installation.
      await expect(heading).toBeVisible();
    });
  });

  describe("Filter and Table sections", () => {
    test("Filter sections visible", async ({ page }) => {
      await page.goto("/devices");

      const filterSection = page.locator('section[aria-label="Filter"]');

      await expect(filterSection).toBeVisible();
    });

    test("Filter starts with default values", async ({ page }) => {
      await page.goto("/devices");

      const filterSection = page.locator('section[aria-label="Filter"]');
      const searchInput = filterSection.locator('input[name="search"]');
      const typeSelector = filterSection.locator(
        'button[id="typeSelectorFilter"]',
      );
      const sortSelector = filterSection.locator(
        'button[id="sortSelectorFilter"]',
      );

      expect(await searchInput.inputValue()).toBe("");
      expect(await typeSelector.innerText()).toBe("Device Type: All");
      expect(await sortSelector.innerText()).toBe(
        "Sort by: System Name (Ascending)",
      );

      // Expect URL not to have query params
      await expect(page).toHaveURL("/devices");
    });

    test("Loads device list", async ({ page }) => {
      await page.goto("/devices");

      const trs = page.locator("table tbody tr");

      // Wait for at least one row to appear
      const rows = await trs.all();
      // Table starts empty
      expect(rows.length).toBe(0);

      // Wait for all rows to be visible
      await trs.last().waitFor({ state: "visible" });

      // Expect table to have devices listed
      const rowCount = await trs.count();
      expect(rowCount).toBeGreaterThan(0);
    });
  });
});
