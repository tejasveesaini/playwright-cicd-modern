## Common commands
    npx playwright test --ui          # Launch Playwright UI mode
    npx playwright test --headed          # Launch Playwright Test in headed mode
    npx playwright test               # Run all tests
    npx playwright test tests/ui/news.spec.ts  # Run a specific test file
    npx playwright test --project=chromium  # Run tests in Chromium browser
    npx playwright test --trace on
    npx playwright show-trace test-results/your-test-folder/trace.zip.

    Debug line-by-line,npx playwright test --debug
    See what went wrong,npx playwright show-trace [path-to-trace.zip]
    Pick an element easily,await page.pause() (opens the Inspector)

## API testing feature (ipify + ipinfo)
- Added API test: `tests/ip-lookup.api.spec.ts`
- Added typed API client: `tests/api/ipLookup.api.ts`
- This test:
    - fetches your public IP from ipify
    - fetches IP details from ipinfo
    - validates response status, IP format, and key geo metadata fields

Run only API tests:
```bash
npm run test:api
```

Run all tests:
```bash
npm test
```

## Environment configuration

1. Copy `.env.example` to `.env`.
2. Set URLs for your target environment.

```bash
cp .env.example .env
```

Variables:
- `BASE_URL`: UI base URL used by Playwright for `page.goto('/')`.
- `IPIFY_BASE_URL`: API base URL for public IP lookup.
- `IPINFO_BASE_URL`: API base URL for IP metadata lookup.

## Important notes
    In Playwright, almost every interaction is a Promise. This is because the test runner (Node.js) lives in one process, and the browser (Chromium/Firefox/WebKit) lives in another. They communicate via a WebSocket.

## Important links
    https://playwright.dev/docs/locators

## Notes
- Playwright is It is a Microsoft-developed Node.js library
- Save the storage state (cookies/local storage) to a file \
  await page.context().storageState({ path: authFile });
  Then Configure playwright.config.ts and file level.
Playwright provides several built-in fixtures out of the box: 
- page: The most common fixture, providing a Page object to interact with a single browser tab.
- context: Provides a BrowserContext object, which is an isolated browsing session (separate cookies, local storage, etc.). Multiple contexts within browser allows efficient parallel execution.
- browser: Gives access to the entire Browser instance (Chromium, Firefox, or WebKit). Worker process; Usually, each Worker launches exactly one browser instance.
- request: An API context for making HTTP requests directly, useful for API testing or setting up backend data.
- browserName: A string representing the name of the browser currently running the tests. 

    If you have 50 tests and 5 workers:

    Each worker will handle 10 tests.

    The worker will open the browser once.

    The worker will create and destroy 10 contexts one after another (or in parallel if the worker is configured for it).