const{test,expect,request}=require("@playwright/test");
let token;;
let orderID;
const LoginPayLoad={
    userEmail: "xoxo@gmail.com",
    userPassword: "Test@123"
}
const OrderPayLoad={
    orders: [
        {
            country: "India",
            productOrderedId: "6960eac0c941646b7a8b3e68"
        }
    ]
}
test.beforeAll(  async () => 
{
  //login
const apicontext= await request.newContext();
const loginResponse= await apicontext.post("https://rahulshettyacademy.com/client/#/auth/login",
  {
    data:LoginPayLoad
  })
  //200 ,201
expect(loginResponse.status()).toBe(200);
const loginResponseJson=await loginResponse.json();
const token=loginResponseJson.token;
console.log(token);
});

const orderResponse= await apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
    data:OrderPayLoad,
    headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
    }
})
const orderResponseJson=await orderResponse.json();
console
 orderID= await orderResponseJson.orders[0];
test.beforeEach(  () => {


});

