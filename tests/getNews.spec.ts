import { test } from '../fixtures/pages.fixture';

test('Get News', async ({ homePage, businessPage }) => {
    await homePage.clickBusinessLink();
    await businessPage.getNews();
});