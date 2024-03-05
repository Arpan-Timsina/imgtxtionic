import { defineConfig } from "cypress";
export const BASE_URL= "http://127.0.0.1:8000/"

const url = BASE_URL

export default defineConfig({
  e2e: {
    baseUrl:url,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});