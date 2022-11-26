const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  viewportWidth: 2560,
  viewportHeight: 1440,
  chromeWebSecurity: false
});





