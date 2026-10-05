import {test, expect, request} from '@playwright/test';
import{customTest} from '../Utils/fixtures';

customTest("Fixtures Demo", async({authenticatedPage, createOrder, testDataForOrder})=>{

await authenticatedPage.goto("https://rahulshettyacademy.com/client/")
await authenticatedPage.locator("[routerlink='/dashboard/myorders']").first().click()
await authenticatedPage.locator("tbody").waitFor();
await expect (authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
console.log(testDataForOrder.productName);


})

