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
 * DB with data and clean it up afterwards as needed. there is an assumption
 * here that at some level the tests are aware of the current data set that
 * would have been seeded.
 *
 * NOTE
 * The order of the tests matter as the headless browser stays opened on the page.
 */
import { expect, test } from "@playwright/test";

const { describe } = test;

const selectors = {
  tableRows: "table tbody tr",
  filterSection: 'section[aria-label="Filter"]',
  searchInput: 'input[name="search"]',
  typeFilter: 'button[id="typeSelectorFilter"]',
  getTypePopoverOption(option: string) {
    return `div[id="typeSelectorFilterPopover"] div[id="option-${option}"]`;
  },
  sortSelector: 'button[id="sortSelectorFilter"]',
  getSortPopoverOption(sortBy: string = "systemname", order: string = "asc") {
    return `div[id="sortSelectorFilterPopover"] div[id="option-${sortBy}-${order}"]`;
  },
  systemNameInput: 'input[name="systemName"]',
  typeSelect: 'button[id="typeSelect"]',
  getTypeSelectPopoverOption(option: string) {
    return `div[id="typeSelectPopover"] div[id="option-${option}"]`;
  },
  hddCapacityInput: 'input[name="hddCapacity"]',
} as const;

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

      const filterSection = page.locator(selectors.filterSection);

      await expect(filterSection).toBeVisible();
    });

    test("Filter starts with default values", async ({ page }) => {
      await page.goto("/devices");

      const filterSection = page.locator(selectors.filterSection);
      const searchInput = filterSection.locator(selectors.searchInput);
      const typeSelector = filterSection.locator(selectors.typeFilter);
      const sortSelector = filterSection.locator(selectors.sortSelector);

      expect(await searchInput.inputValue()).toBe("");
      expect(await typeSelector.innerText()).toBe("Device Type: All");
      expect(await sortSelector.innerText()).toBe(
        "Sort by: System Name (Ascending)",
      );

      // Expect URL not to have query params
      await expect(page).toHaveURL("/devices");
    });

    test("URL search params change initial filter values", async ({ page }) => {
      const urlWithParams =
        "/devices?systemName=desktop&sortBy=hddCapacity&order=desc&type=MAC";
      await page.goto(urlWithParams);

      const filterSection = page.locator(selectors.filterSection);
      const searchInput = filterSection.locator(selectors.searchInput);
      const typeSelector = filterSection.locator(selectors.typeFilter);
      const sortSelector = filterSection.locator(selectors.sortSelector);

      expect(await searchInput.inputValue()).toBe("desktop");
      expect(await typeSelector.innerText()).toBe("Device Type: Mac");
      expect(await sortSelector.innerText()).toBe(
        "Sort by: HDD Capacity (Descending)",
      );

      // Make sure nothing changes in the URL
      await expect(page).toHaveURL(urlWithParams);
    });

    test("Selecting filters updates URL", async ({ page }) => {
      await page.goto("/devices");
      // Just to be entirely sure that the URL is clean
      await expect(page).toHaveURL("/devices");

      const filterSection = page.locator(selectors.filterSection);

      const searchInput = filterSection.locator(selectors.searchInput);
      await searchInput.fill("desktop");

      // Open type options popover
      await filterSection.locator(selectors.typeFilter).click();

      // Select MAC option
      await page.locator(selectors.getTypePopoverOption("MAC")).click();

      // Open sort options popover
      await filterSection.locator(selectors.sortSelector).click();

      // Select HDD Capacity Descending
      await page
        .locator(selectors.getSortPopoverOption("hddCapacity", "desc"))
        .click();

      // Expect URL to have query params
      await expect(page).toHaveURL(
        "/devices?systemName=desktop&type=MAC&sortBy=hddCapacity&order=desc",
      );
    });

    test("Loads device list", async ({ page }) => {
      await page.goto("/devices");

      const trs = page.locator(selectors.tableRows);

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

    test("Device list gets filtered", async ({ page }) => {
      await page.goto("/devices");

      let trs = page.locator(selectors.tableRows);

      // Wait for all rows to be visible
      await trs.last().waitFor({ state: "visible" });

      // Expect table to have devices listed
      const rowCount = await trs.count();
      expect(rowCount).toBeGreaterThan(0);

      const filterSection = page.locator(selectors.filterSection);

      const searchInput = filterSection.locator(selectors.searchInput);
      // Filter by just one character
      await searchInput.fill("a");

      trs = page.locator(selectors.tableRows);
      await trs.last().waitFor({ state: "visible" });
      const rowsAfterSearch = await trs.count();

      expect(rowsAfterSearch).toBeLessThan(rowCount);

      await filterSection.locator(selectors.typeFilter).click();
      await page.locator(selectors.getTypePopoverOption("WINDOWS")).click();

      trs = page.locator(selectors.tableRows);
      await trs.last().waitFor({ state: "visible" });
      const rowsAfterTypeSelection = await trs.count();

      expect(rowsAfterTypeSelection).toBeLessThan(rowsAfterSearch);
    });

    test("Device list gets sorted", async ({ page }) => {
      await page.goto("/devices");

      let trs = page.locator(selectors.tableRows);
      await trs.last().waitFor({ state: "visible" });
      // Get the header section of the cel. System Name
      const colHeaders = await Promise.all(
        (await trs.all()).map((row) => row.locator("td h3").innerText()),
      );

      const sortedItems = [...colHeaders].sort((a, b) => a.localeCompare(b));

      // Assert the initial list is sorted alphabetically
      expect(colHeaders).toEqual(sortedItems);

      const filterSection = page.locator(selectors.filterSection);
      // Open sort options popover
      await filterSection.locator(selectors.sortSelector).click();

      // Select System Name Descending
      await page
        .locator(selectors.getSortPopoverOption("systemName", "desc"))
        .click();

      trs = page.locator(selectors.tableRows);
      await trs.last().waitFor({ state: "visible" });
      // Get the header section of the cel. System Name
      const newColHeaders = await Promise.all(
        (await trs.all()).map((row) => row.locator("td h3").innerText()),
      );

      // Assert the list is now sorted in reverse order
      expect(newColHeaders).toEqual(sortedItems.reverse());
    });

    test.only("Insert a new Device", async ({ page }) => {
      await page.goto("/devices");

      let trs = page.locator(selectors.tableRows);
      await trs.last().waitFor({ state: "visible" });
      const rowCount = await trs.count();

      // Open add modal
      await page.getByRole("link", { name: "Add Device" }).click();
      // Wait for modal to be open
      await page
        .getByRole("dialog", { name: "Add Device" })
        .waitFor({ state: "visible" });

      expect(page).toHaveURL("/devices/add");

      // Expect submit button to be disabled
      expect(
        await page.getByRole("button", { name: "Submit" }).isDisabled(),
      ).toBeTruthy();

      // Fill in the form -> system name
      await page.locator(selectors.systemNameInput).fill("New Device");
      // Open type options popover
      await page.locator(selectors.typeSelect).click();
      // Select MAC option
      await page.locator(selectors.getTypeSelectPopoverOption("MAC")).click();
      // Press sequentially is important here as .fill was bypassing the events
      // that would trigger the disabled state to change
      await page.locator(selectors.hddCapacityInput).pressSequentially("100");

      // Submit form
      await page.getByRole("button", { name: "Submit" }).click();
      // Wait for modal to be hidden
      await page
        .getByRole("dialog", { name: "Add Device" })
        .waitFor({ state: "hidden" });

      trs = page.locator(selectors.tableRows);
      await trs.last().waitFor({ state: "visible" });
      const newRowCount = await trs.count();

      // Expect the list to have one more item
      expect(newRowCount - rowCount).toBe(1);
    });

    // TODO Edit item

    // TODO modal form validation

    // TODO Delete item
  });
});
