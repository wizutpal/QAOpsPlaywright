// UI Login -> .json 
// test Browser -> .json, cart, order, order details, order history

import {test, expect} from '@playwright/test'


let webContext: any; 
test.beforeAll( async ({browser})=>
{
    const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    
await page.locator('#userEmail').fill('utpal2@gmail.com')
await page.locator('#userPassword').fill('Pasword@123')
await page.locator('#login').click();
await page.locator('.card-body h5').first().waitFor()
await context.storageState({path: 'state.json'});
webContext= await browser.newContext({storageState: 'state.json'})
})



test('Client App Login', async ()=>{

    const productName= 'ZARA COAT 3';
    const email= 'utpal2@gmail.com'
    
    
    const page= await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
// await page.waitForLoadState('networkidle');

console.log(await page.locator('.card-body h5').allTextContents());
const product = page.locator('.card-body');

const titles = await page.locator('.card-body b').allTextContents();
const count= await product.count();

for(let i=0; i<count; i++){
if(await product.nth(i).locator('b').textContent() === productName){
    //add to cart
    await product.nth(i).locator("text= Add to Cart").click();
    break;
}
}
await page.locator("[routerlink*=cart]").click();

await page.locator("div li").first().waitFor();
const bool= page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(bool).toBeTruthy();

page.locator("text= Checkout").click();
await page.locator("[type='text']").nth(1).fill('256');
await page.locator("[type='text']").nth(2).fill('utpal');
await page.locator("[type='text']").nth(3).fill('rahulshettyacademy');
await page.locator("[placeholder*='Country']").pressSequentially("ind");
const dropdown= page.locator('.ta-results')
await dropdown.waitFor();
const optionsCount= await dropdown.locator('button').count();
for (let i= 0; i< optionsCount; i++){
   const text= await dropdown.locator("button").nth(i).textContent();
    if(text === ' India'){
        //click
        dropdown.locator("button").nth(i).click()
        break;
    }
}
expect (page.locator(".user__name [type='text']").first()).toHaveText(email);
await page.locator(".action__submit").click()
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
const orderId= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderId);
await page.locator("[routerlink='/dashboard/myorders']").first().click()
await page.locator("tbody").waitFor();
const rows= page.locator("tbody tr")



for(let i=0;i<await rows.count();i++)
{   
    const rowOrderId= await rows.nth(i).locator("th").textContent();
    if(orderId.includes(rowOrderId)){
        //click on view
        await rows.nth(i).locator("button").first().click();

        break;
    }
}

const orderIdDetails= await page.locator(".col-text").textContent();
console.log((orderIdDetails));
expect(orderId?.includes(orderIdDetails)).toBeTruthy()

await page.pause();
})
