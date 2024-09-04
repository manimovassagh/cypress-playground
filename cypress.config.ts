import { defineConfig } from 'cypress';

export default defineConfig({
  reporter: 'mochawesome',
  video:true,
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: true,
    html: true, // Generate only JSON
    json: true, 
    video:true,// Generate JSON for report merging
    charts:true,
    saveJson:true,
    saveHtml:true
  },
  e2e: {
    setupNodeEvents(on, config) {
      config.env.CYPRESS_JWT_TOKEN = process.env.CYPRESS_JWT_TOKEN;
      config.env.JWT_TOKEN = process.env.JWT_TOKEN;   
         return config;
    },
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});
