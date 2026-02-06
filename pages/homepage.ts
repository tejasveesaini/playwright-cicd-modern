import { BasePage } from './basepage';
import { Locator, Page } from '@playwright/test';

export class HomePage extends BasePage {
    readonly businessLink = this.page.getByRole('link', { name: 'Business' });

    constructor(page: Page) {
        super(page);
        // this.businessLink = page.getByRole('link', { name: 'Business' });
    }

    async clickBusinessLink() {
        await this.click(this.businessLink);
    }
}