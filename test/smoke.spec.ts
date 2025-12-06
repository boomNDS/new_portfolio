import { describe, expect, it } from "vitest";
import { $fetch, setup } from "@nuxt/test-utils/e2e";

await setup({
  server: true,
  port: 4010,
  host: "127.0.0.1",
});

describe("home page", () => {
  const run = process.env.NUXT_TEST_ENABLE === "true" ? it : it.skip;

  run("renders hero copy", async () => {
    const html = await $fetch("/", { baseURL: "http://127.0.0.1:4010" });
    expect(html).toContain("foodie developer");
  });
});
