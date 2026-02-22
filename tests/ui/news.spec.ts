import { test, expect } from '../../fixtures/pages.fixture';

test.describe('News Tests', () => {
    test('extract top 5 news articles', async ({ googleNewsPage }) => {
        const topNews = await googleNewsPage.getTop5News();
        expect(topNews.length).toEqual(5);
        for (const article of topNews) {
            expect(article.title).toBeTruthy();
            expect(article.url).toMatch(/^https?:\/\/.+\..+/);
        }
        test.info().annotations.push({ type: 'info', description: JSON.stringify(topNews, null, 2) });
    });
});
