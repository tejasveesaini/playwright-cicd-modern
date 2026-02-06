import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page
    }

    /**
     * Navigates the browser to a specific URL.
     * @param url - The full web address (e.g., 'https://google.com')
     * @returns A Promise that resolves once the page has loaded.
     */
    async goto(url: string): Promise<void> {
        // 'await' pauses execution until the page finishes navigating
        // 'this.page' refers to the Playwright Page instance stored in this class
        await this.page.goto(url);
    }

    /**
     * Click on an element
     */
    async click(locator: Locator): Promise<void> {
        await locator.click();
    }
}