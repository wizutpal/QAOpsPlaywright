import { expect, test } from '@playwright/test';
import { POManager } from '../pageobejects/POManager';

//Json > String > JS Object

//const dataSet= JSON.parse(JSON.stringify(('../Utils/placeorderTestData.json')))
import dataSet from '../Utils/placeorderTestData.json';

for(const data of dataSet)
{
test(`@Web Test with product: ${data.productName}`, async ({page}) =>
{
    const product = page.locator('.card-body');
    
    const poManager= new POManager(page);
    const loginPage= poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(data.username,data.password)
// await page.waitForLoadState('networkidle');
const dashboardPage= poManager.getDashboardPage();
await dashboardPage.searchProductAddCart(data.productName)
await dashboardPage.navigateToCart();


   const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    let orderId: any;
    orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

})
}