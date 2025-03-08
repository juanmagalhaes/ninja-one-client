import { HttpClient } from "@/lib/http-client";

const BASE_URL = "http://localhost:3000";
let httpClient: HttpClient;

describe("HttpClient", () => {
  beforeEach(() => {
    httpClient = new HttpClient(BASE_URL);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should make a GET request and convert response keys to camelCase", async () => {
    const mockResponse = { system_name: "DESKTOP-123", hdd_capacity: "500" };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await httpClient.get<{
      systemName: string;
      hddCapacity: string;
    }>("/device");

    expect(result).toEqual({ systemName: "DESKTOP-123", hddCapacity: "500" });
  });

  it("should make a POST request and convert body keys to snake_case", async () => {
    const mockRequest = { systemName: "LAPTOP-XYZ", hddCapacity: "250" };

    const expectedRequestBody = JSON.stringify({
      system_name: "LAPTOP-XYZ",
      hdd_capacity: "250",
    });

    const mockResponse = {
      id: "123",
      system_name: "LAPTOP-XYZ",
      hdd_capacity: "250",
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await httpClient.post<{
      id: string;
      systemName: string;
      hddCapacity: string;
    }>("/device", mockRequest);

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/device`,
      expect.objectContaining({
        method: "POST",
        body: expectedRequestBody,
      }),
    );

    expect(result).toEqual({
      id: "123",
      systemName: "LAPTOP-XYZ",
      hddCapacity: "250",
    });
  });

  it("should make a PUT request and convert body keys to snake_case", async () => {
    const mockRequest = { systemName: "LAPTOP-XYZ", hddCapacity: "512" };

    const expectedRequestBody = JSON.stringify({
      system_name: "LAPTOP-XYZ",
      hdd_capacity: "512",
    });

    const mockResponse = {
      id: "123",
      system_name: "LAPTOP-XYZ",
      hdd_capacity: "512",
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await httpClient.put<{
      id: string;
      systemName: string;
      hddCapacity: string;
    }>("/device/123", mockRequest);

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/device/123`,
      expect.objectContaining({
        method: "PUT",
        body: expectedRequestBody,
      }),
    );

    expect(result).toEqual({
      id: "123",
      systemName: "LAPTOP-XYZ",
      hddCapacity: "512",
    });
  });

  it("should make a DELETE request", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

    await httpClient.delete<void>("/device/123");

    expect(fetch).toHaveBeenCalledWith(
      `${BASE_URL}/device/123`,
      expect.objectContaining({ method: "DELETE" }),
    );
  });

  it("should throw an error on HTTP failure", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(httpClient.get("/device")).rejects.toThrow("HTTP Error: 500");
  });
});
