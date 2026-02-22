import { BasePage } from './basepage';
import { Page } from '@playwright/test';

export interface NewsArticle {
    title: string;
    url: string;
}

export class GoogleNewsPage extends BasePage {

    readonly articleLinks = this.page.locator('a[data-n-tid="29"]');
    readonly weatherLink = this.page.getByRole('link', { name: 'Google Weather' });

    readonly tempLocator = this.weatherLink
        .locator('..') // Steps up to the parent
        .getByText(/^-?\d+°[CF]$/); // Finds the sibling with the temperature

    constructor(page: Page) {
        super(page);
    }

    /**
     * Get the temperature from the Google News weather widget
     * @returns Promise<string> - The temperature value
     */
    async getTemperature(): Promise<string> {
        try {
            // Try to find temperature using the locator variable
            const temperature = await this.tempLocator.innerText();
            return temperature?.trim() || 'Temperature not found';
        } catch (error) {
            return 'Temperature not found';
        }
    }

    /**
       * Extracts the top 5 news headlines and their corresponding URLs.
       * @returns A promise that resolves to an array of up to 5 NewsArticle objects.
       */
    async getTop5News(): Promise<NewsArticle[]> {
        // evaluateAll runs a JavaScript function in the browser against all elements matching the locator
        return await this.articleLinks.evaluateAll((elements) => {
            // Limit to top 5 and map to our interface
            return elements.slice(0, 5).map((el) => {
                const anchor = el as HTMLAnchorElement;
                return {
                    title: anchor.textContent?.trim() || '',
                    url: anchor.href,
                };
            });
        });
    }
}