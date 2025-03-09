/*
 * This file is for public environment variables that are safe to be exposed to the client.
 */
import z from "zod";

const devModeOverrides = {
  ...(process.env.NODE_ENV === "development" && {
    API_URL: z.string().default("http://localhost:3000"),
  }),
};

const publicEnvSchema = z.object({
  // Automatically set by next.js
  NODE_ENV: z.enum(["development", "production"]),

  // Needs to be set in production
  API_URL: z.string({
    message: "API_URL is required in production",
  }),

  ...devModeOverrides,
});

export const ENV = publicEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.API_URL,
});
