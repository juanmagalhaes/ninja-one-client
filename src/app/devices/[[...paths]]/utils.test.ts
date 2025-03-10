import { formatHddCapacity } from "../utils";

describe("devices/utils", () => {
  it("should format hdd capacity", () => {
    expect(formatHddCapacity("512")).toBe("512 GB");
    expect(formatHddCapacity("1024")).toBe("1 TB");
    expect(formatHddCapacity("2048")).toBe("2 TB");
  });
});
