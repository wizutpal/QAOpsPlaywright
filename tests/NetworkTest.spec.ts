import {expect, test, request} from '@playwright/test'
import { APIUtils } from '../Utils/APIUtils';

const loginPayLoad= {userEmail :"utpal2@gmail.com",userPassword:"Pasword@123"}
const orderPayLoad= {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]}
const fakePayLoadOrders = {data: [], message: "No Orders"};

let token;
let orderId;
let response: any;

    test.beforeAll( async ()=>
    {   
        // must create the context first
        const apiContext = await request.newContext();
        const apiutils= new APIUtils(apiContext, loginPayLoad);
        response= await apiutils.createOrder(orderPayLoad);


    });

test("Client App Test", async ({page})=>
{
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    },response.token);
    
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
   async route =>
    {
        //intercepting the response -> API response _> {fake playwright response} -> browser -> Render the response
    const response= await page.request.fetch(route.request());
    let body = JSON.stringify(fakePayLoadOrders);
    route.fulfill(
        {
            response,
            body
        }
    )
    }
)

await page.locator("[routerlink='/dashboard/myorders']").first().click()
await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
console.log(await page.locator(".mt-4").textContent());
 





})