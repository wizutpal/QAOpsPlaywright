import { test, expect } from '@playwright/test'

test('Security Test request Interceptor', async ({ page }) => {

    const productName = 'ZARA COAT 3';
    const email = 'utpal2@gmail.com'
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    const product = page.locator('.card-body');
    await page.locator('#userEmail').fill(email)
    await page.locator('#userPassword').fill('Pasword@123')
    await page.locator('#login').click();
    await page.locator('.card-body h5').first().waitFor()
    await page.locator("[routerlink='/dashboard/myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("button:has-text('View')").first().click();

    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

})