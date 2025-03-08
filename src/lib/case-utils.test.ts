import { describe } from "node:test";

import { toCamelCase, toSnakeCase } from "@/lib/case-utils";

describe("case-utils", () => {
  it("should convert snake_case to camelCase", () => {
    expect(toCamelCase({ first_name: "John", last_name: "Doe" })).toEqual({
      firstName: "John",
      lastName: "Doe",
    });
  });

  it("should convert camelCase to snake_case", () => {
    expect(toSnakeCase({ firstName: "John", lastName: "Doe" })).toEqual({
      first_name: "John",
      last_name: "Doe",
    });
  });
});
