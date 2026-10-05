import { expect, test, Page } from '@playwright/test';
import { POManager } from '../pageobejects/POManager';

//Json > String > JS Object

//const dataSet= JSON.parse(JSON.stringify(('../Utils/placeorderTestData.json')))
import * as dataSet from '../Utils/placeorderTestData.json';
import { customTest } from '../Utils/test-base';


test('@Web Browser Context-validation and Get 1st product', async ({page}) =>
{
    const product = page.locator('.card-body');
    
    const poManager= new POManager(page);
    const loginPage= poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(dataSet.username,dataSet.password)
// await page.waitForLoadState('networkidle');
const dashboardPage= poManager.getDashboardPage();
await dashboardPage.searchProductAddCart(dataSet.productName)
await dashboardPage.navigateToCart();


   const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(dataSet.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    let orderId: any
      orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

})