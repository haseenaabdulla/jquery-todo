// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000/v1/',
    specPattern: 'cypress/integration/**/*.js',
    setupNodeEvents() {
      //
    },
  },
});
