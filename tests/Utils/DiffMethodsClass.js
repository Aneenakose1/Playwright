const { expect } = require('@playwright/test');

class DiffMethodsTests {
    constructor(page) {
        this.page = page;
        this.email = "anshika@gmail.com";
        this.productName = 'ZARA COAT 3';
        this.products = page.locator(".card-body");
    }

    async login() {
        await this.page.goto("https://rahulshettyacademy.com/client");
        await this.page.getByPlaceholder("email@example.com").fill(this.email);
        await this.page.getByPlaceholder("enter your passsword").fill("Iamking@000");
        await this.page.getByRole('button', { name: "Login" }).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(".card-body b").first().waitFor();
    }

    async addToCart() {
        await this.page.locator(".card-body").filter({ hasText: "ZARA COAT 3" })
            .getByRole("button", { name: "Add to Cart" }).click();
    }

    async goToCart() {
        await this.page.getByRole("listitem").getByRole('button', { name: "Cart" }).click();
        await this.page.locator("div li").first().waitFor();
        await expect(this.page.getByText("ZARA COAT 3")).toBeVisible();
    }

    async checkout() {
        await this.page.getByRole("button", { name: "Checkout" }).click();
        await this.page.getByPlaceholder("Select Country").pressSequentially("ind");
        await this.page.getByRole("button", { name: "India" }).nth(1).click();
        await this.page.getByText("PLACE ORDER").click();
        await expect(this.page.getByText("Thankyou for the order.")).toBeVisible();
    }
}

module.exports = { DiffMethodsTests };