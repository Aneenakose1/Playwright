const { test, expect, request } = require("@playwright/test");
let token;
let orderID;
const LoginPayLoad = {
    userEmail: "xoxo@gmail.com",
    userPassword: "Test@123"
};
const OrderPayLoad = {
    orders: [
        {
            country: "India",
            productOrderedId: "6960eac0c941646b7a8b3e68"
        }
    ]
};

test.beforeAll(async () => {
    // Login
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data: LoginPayLoad
    });
    expect(loginResponse.status()).toBe(200);
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

    // Create Order
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: OrderPayLoad,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    const orderResponseJson = await orderResponse.json();
    orderID = orderResponseJson.orders[0];
    console.log(orderID);
});

test.beforeEach(() => {
    // Any per-test setup can go here
});

test('Create and verify order', async () => {
    // Example test: Verify that orderID is set
    expect(orderID).toBeDefined();
    console.log('Order created successfully with ID:', orderID);
});

// Add more tests as needed, e.g., fetching orders, deleting, etc.

