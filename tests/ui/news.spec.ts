import { test, expect } from '../../fixtures/pages.fixture';

test('extract top 5 news articles', async ({ googleNewsPage }) => {
    const topNews = await googleNewsPage.getTop5News();
    expect(topNews.length).toEqual(5);
    expect(topNews[0].title).toBeTruthy();
    expect(topNews[0].url).toContain('http');
    console.log(topNews);
});
