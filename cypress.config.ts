import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.JWT_TOKEN = process.env.JWT_TOKEN;

      // implement node event listeners here
    },
  },
});