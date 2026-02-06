## Common commands
    npx playwright test --ui          # Launch Playwright UI mode
    npx playwright test --headed          # Launch Playwright Test in headed mode
    npx playwright test               # Run all tests
    npx playwright test tests/getNews.spec.ts  # Run a specific test file
    npx playwright test --project=chromium  # Run tests in Chromium browser

## Important notes
    In Playwright, almost every interaction is a Promise. This is because the test runner (Node.js) lives in one process, and the browser (Chromium/Firefox/WebKit) lives in another. They communicate via a WebSocket.

## Important links
    https://playwright.dev/docs/locators