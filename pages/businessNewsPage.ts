import { BasePage } from './basepage';
import { Page, Locator, expect } from '@playwright/test';

export class BusinessNewsPage extends BasePage {
    // Locators instantiated exactly where they are defined
    readonly pageHeader: Locator = this.page.locator('h1').filter({ hasText: 'Business' });
    readonly businessLabel: Locator = this.page.getByLabel('Business');
    /**
     * Clicks the element labeled 'Business'.
     */
    async clickBusinessLabel() {
        await this.click(this.businessLabel);
    }
    readonly followTopicButton: Locator = this.page.locator('button[aria-label^="Follow this topic"]');
    readonly shareButton: Locator = this.page.locator('button[aria-label="Share"]');

    readonly tabChips: Locator = this.page.locator('button[role="tab"]');
    readonly scrollChipsForward: Locator = this.page.locator('button[aria-label="Scroll chips forward"]');
    readonly scrollChipsBackward: Locator = this.page.locator('button[aria-label="Scroll chips backward"]');

    readonly marketIndicesCards: Locator = this.page.locator('.VGgDjd a.taS2Yb');

    readonly articleTitles: Locator = this.page.locator('a.gPFEn');
    readonly publishers: Locator = this.page.locator('.vr1PYe');
    readonly seeMoreHeadlinesLinks: Locator = this.page.locator('a[aria-label^="See more headlines"]');

    constructor(page: Page) {
        super(page);
    }

    /**
     * Clicks a specific category tab by its visible name.
     */
    async clickCategoryTab(tabName: string) {
        await this.click(this.tabChips.filter({ hasText: tabName }));
    }

    /**
     * Extracts the current value and change percentage for a specific market index.
     */
    async getMarketIndexData(indexName: string) {
        const indexCard = this.page.getByRole('link', { name: new RegExp(indexName, 'i') }).first();
        await expect(indexCard).toBeVisible();

        const cardText = (await indexCard.innerText()).replace(/\s+/g, ' ').trim();
        const percentMatch = cardText.match(/-?\d+(?:\.\d+)?%/);
        const percentChange = percentMatch ? percentMatch[0] : '';

        const textWithoutPercent = cardText.replace(/-?\d+(?:\.\d+)?%/g, ' ').trim();
        const numberMatches = textWithoutPercent.match(/-?\d[\d,.]*/g) ?? [];
        const value = numberMatches[0] ?? '';
        const pointsChange = numberMatches[1] ?? '';

        return {
            index: indexName,
            value,
            percentChange,
            pointsChange
        };
    }

    /**
     * Clicks an article by matching a substring of its headline.
     */
    async openArticleByTitle(headlineMatch: string) {
        await this.click(this.articleTitles.filter({ hasText: headlineMatch }).first());
    }

    /**
     * Opens the overflow menu ("More") for a specific article.
     */
    async clickMoreOptionsForArticle(headlineMatch: string) {
        // Keeps dynamic locators templated within the method itself
        await this.click(this.page.locator(`button[aria-label^="More - ${headlineMatch}"]`));
    }
}