const { test, expect, request } = require("@playwright/test");

class APIUtils {
    constructor() {
        this.request = request;
    }

    async login(loginPayload) {
        const apiContext = await this.request.newContext();
        const loginResponse = await apiContext.post("https://rahulshettyacademy.com/client/#/auth/login", {
            data: loginPayload
        });
        expect(loginResponse.status()).toBe(200);
        const loginResponseJson = await loginResponse.json();
        return loginResponseJson.token;
    }

    async createOrder(token, orderPayload) {
        const apiContext = await this.request.newContext();
        const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        const orderResponseJson = await orderResponse.json();
        return orderResponseJson.orders[0];
    }
}

module.exports = { APIUtils };