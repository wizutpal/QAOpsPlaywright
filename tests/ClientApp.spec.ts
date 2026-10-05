import { expect, test } from '@playwright/test';

test('Register user', async ({page}) =>
{
    const email= 'utpal2@gmail.com'
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('.text-reset').click();
    
await page.locator('#firstName').fill('Utpal')
await page.locator('#lastName').fill('Phukan')
await page.locator('#userEmail').fill(email)
await page.locator('#userMobile').fill('1234567890')  
await page.locator('select[formcontrolname="occupation"]').selectOption({ label: 'Doctor'});
await page.locator("input[value='Male']").click();
await page.locator('#userPassword').fill('Pasword@123')
await page.locator('#confirmPassword').fill('Pasword@123')
await page.locator("input[type='checkbox']").click();
await page.locator('#login').click();
await page.getByText('Login').click();
await page.locator('#userEmail').fill('utpal2@gmail.com')
await page.locator('#userPassword').fill('Pasword@123')
await page.locator('#login').click();

})

test.only('Browser Context-validation and Get 1st product', async ({page}) =>
{
    const productName= 'ZARA COAT 3';
    const email= 'utpal2@gmail.com'
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    const product = page.locator('.card-body');
await page.locator('#userEmail').fill(email)
await page.locator('#userPassword').fill('Pasword@123')
await page.locator('#login').click();
// await page.waitForLoadState('networkidle');
await page.locator('.card-body h5').first().waitFor()
console.log(await page.locator('.card-body h5').allTextContents());

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


})