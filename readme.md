# Playwright CI/CD Modern

A production-grade **Playwright** test automation framework built with **TypeScript**, covering both UI and API testing with a fully automated CI/CD pipeline on GitHub Actions.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Test Framework | Playwright |
| Language | TypeScript (strict typing) |
| CI/CD | GitHub Actions (sharded, parallel) |
| Design Pattern | Page Object Model (POM) |
| API Testing | Playwright `request` context |
| Config Management | dotenv + typed env config |

## Architecture

```
├── pages/              # Page Object Models (BasePage → child pages)
├── fixtures/           # Custom Playwright fixtures for DI
├── tests/
│   ├── ui/             # UI tests (Google News, stocks, temperature)
│   └── api/            # API tests (IP lookup: ipify + ipinfo)
├── config/             # Typed environment configuration
├── utils/              # Shared helper utilities
└── .github/workflows/  # CI/CD pipeline (sharded UI + API jobs)
```

## Key Features

- **Page Object Model** — `BasePage` with reusable actions; child pages (`GoogleNewsPage`, `BusinessNewsPage`) for clean test code.
- **Custom Fixtures** — Dependency injection of page objects via `base.extend()`.
- **API Testing** — Typed API client (`IpLookupApi`) validates public IP retrieval and geo-metadata.
- **CI/CD Pipeline** — GitHub Actions with:
  - **Sharded UI tests** (2 parallel runners) for faster execution
  - **Separate API job** (lightweight, single runner)
  - **Manual suite selection** (`all`, `ui`, `api`) via `workflow_dispatch`
  - Browser caching, concurrency control, and artifact uploads
- **Environment Config** — Centralized, typed config (`config/env.ts`) with `.env` support.

## Quick Start

```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install --with-deps

# Copy environment config
cp .env.example .env

# Run all tests
npm test

# Run only UI tests (interactive mode)
npm run test:ui

# Run only API tests
npm run test:api
```

## Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `BASE_URL` | UI base URL for `page.goto('/')` | `https://news.google.com` |
| `IPIFY_BASE_URL` | Public IP lookup API | `https://api.ipify.org` |
| `IPINFO_BASE_URL` | IP metadata lookup API | `https://ipinfo.io` |

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/playwright.yml`) runs on every push/PR to `main`:

| Job | Shards | Timeout | Trigger |
|-----|--------|---------|---------|
| UI Tests | 2 parallel | 15 min | push, PR, manual (`ui` / `all`) |
| API Tests | 1 | 10 min | push, PR, manual (`api` / `all`) |

## Useful Commands

```bash
npx playwright test --headed          # Run in headed browser mode
npx playwright test --debug           # Debug line-by-line
npx playwright test --trace on        # Capture traces for debugging
npx playwright show-trace <trace.zip> # View trace after a run
```

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