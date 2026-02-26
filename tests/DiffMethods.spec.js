const { test, expect } = require('@playwright/test');
const { DiffMethodsTests } = require('./Utils/DiffMethodsClass');

test('@Webst Client App login', async ({ page }) => {
    const diffMethodsTests = new DiffMethodsTests(page);
    await diffMethodsTests.login();
    await diffMethodsTests.addToCart();
    await diffMethodsTests.goToCart();
    await diffMethodsTests.checkout();
    // await page.pause();
});