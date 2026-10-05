import {expect, test, request} from '@playwright/test'
import { APIUtils } from '../Utils/APIUtils';

const loginPayLoad= {userEmail :"utpal2@gmail.com",userPassword:"Pasword@123"}
const orderPayLoad= {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]}

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

test("@API Client App Test", async ({page})=>
{
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    },response.token);
    
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

await page.locator("[routerlink='/dashboard/myorders']").first().click()
await page.locator("tbody").waitFor();
const rows= page.locator("tbody tr")



for(let i=0;i<await rows.count();i++)
{   
    const rowOrderId= await rows.nth(i).locator("th").textContent();
    if(response.orderId.includes(rowOrderId)){
        //click on view
        await rows.nth(i).locator("button").first().click();

        break;
    }
}

const orderIdDetails= await page.locator(".col-text").textContent();
console.log((orderIdDetails));
expect(response.orderId.includes(orderIdDetails)).toBeTruthy()


})