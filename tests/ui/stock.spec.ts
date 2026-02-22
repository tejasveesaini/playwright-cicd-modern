import { test, expect } from '../../fixtures/pages.fixture';

test.describe('Market Index Validations', () => {
    test('verify the S&P/TSX Composite Index drop is not more than 1%', async ({ businessNewsPage }) => {
        await businessNewsPage.clickBusinessLabel();
        const indexName = 'S&P/TSX Composite Index';
        const indexData = await businessNewsPage.getMarketIndexData(indexName);
        const percentageString = indexData.percentChange.replace('%', '').trim();
        const percentageValue = parseFloat(percentageString);
        expect(isNaN(percentageValue), 'Failed to parse the percentage value').toBeFalsy();
        expect(
            percentageValue,
            `Expected ${indexName} drop to be no more than 1%, but it was ${percentageValue}%`
        ).toBeGreaterThanOrEqual(-1.0);
    });
});
