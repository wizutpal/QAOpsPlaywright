import { expect, test } from '@playwright/test';
import { POManager } from '../pageobejects/POManager';

//Json > String > JS Object

import {customTest} from '../Utils/test-base'

customTest('@Web Browser Context-validation and Get 1st product', async ({page, testDataForOrder}) =>
{
    const product = page.locator('.card-body');
    
    const poManager= new POManager(page);
    const loginPage= poManager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password)
// await page.waitForLoadState('networkidle');
const dashboardPage= poManager.getDashboardPage();
await dashboardPage.searchProductAddCart(testDataForOrder.productName)
await dashboardPage.navigateToCart();


   const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();

})