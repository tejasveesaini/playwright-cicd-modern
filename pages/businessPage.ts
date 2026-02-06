import { BasePage, } from './basepage';
import { Page, expect } from '@playwright/test';

export class BusinessPage extends BasePage {
    headline = this.page.locator("//c-wiz//div[.//h1[contains(.,'Business')]]//c-wiz//time//parent::div//preceding-sibling::a");

    constructor(page: Page) {
        super(page);
    }

    async getNews() {
        await this.headline.first().waitFor({ state: 'visible' });
        const headlines = await this.headline.all();//this doesnt wait for pageloading hence we use waitfor above
        console.log(`Found ${headlines.length} headlines`); // If this says 0, the loop is skipped.
        expect(headlines.length).toBeGreaterThan(0);

        for (const locator of headlines) {
            console.log(await locator.innerText());
        }
    }





}