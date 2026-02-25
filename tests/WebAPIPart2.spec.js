const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require('./Utils/APIUtils2');
let token;
let orderID;
const LoginPayLoad = {
    userEmail: "xoxo@gmail.com",
    userPassword: "Test@123"
}
const OrderPayLoad = {
    orders: [
        {
            country: "India",
            productOrderedId: "6960eac0c941646b7a8b3e68"
        }
    ]
}
test.beforeAll(async () => {
    const apiUtils = new APIUtils();
    token = await apiUtils.login(LoginPayLoad);
    console.log(token);
    orderID = await apiUtils.createOrder(token, OrderPayLoad);
});

test.beforeEach(() => {

});