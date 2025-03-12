/*
 * This file is for public environment variables that are safe to be exposed to the client.
 */
import z from "zod";

const isProd = process.env.NODE_ENV === "production";

const localOverrides = {
  ...(!isProd && {
    API_URL: z.string().default("http://localhost:3000"),
  }),
};

const publicEnvSchema = z.object({
  // Automatically set by next.js
  NODE_ENV: z.enum(["development", "test", "production"]),

  // Needs to be set in production
  API_URL: z.string({
    message: "API_URL is required in production",
  }),

  // Debug network delay in milliseconds
  DEBUG_NETWORK_DELAY: z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined || isProd) return undefined;

      const delay = parseInt(val, 10);
      if (isNaN(delay)) throw new Error("DEBUG_NETWORK_DELAY must be a number");

      return delay;
    })
    .pipe(z.number().optional()),

  ...localOverrides,
});

export const ENV = publicEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.API_URL,
  DEBUG_NETWORK_DELAY: process.env.DEBUG_NETWORK_DELAY,
});
