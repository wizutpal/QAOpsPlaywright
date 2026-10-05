import { test as base, Page, request } from "@playwright/test";
import { APIUtils } from './APIUtils';


const loginPayLoad= {userEmail :"utpal2@gmail.com",userPassword:"Pasword@123"}
const orderPayLoad= {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]}

type MyFixtures = {
  authenticatedPage: Page;
  createOrder: any;
  testDataForOrder: any;
};

export const customTest = base.extend<MyFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill("utpal2@gmail.com");
    await page.locator("#userPassword").fill("Pasword@123");
    await page.locator("#login").click();
    await page.waitForLoadState("networkidle");

    await use(page);
    // tear down. Before the use is called as setup and after use the below code is teardown
    await page.close();

  },

  createOrder: async({}, use: any)=>{
 const apiContext = await request.newContext();
        const apiutils= new APIUtils(apiContext, loginPayLoad);
      const  response= await apiutils.createOrder(orderPayLoad);
    await use(response);

    // tear down
    await apiContext.dispose();
  },

  testDataForOrder: {
    productName: 'ADIDAS ORIGINAL' 
  }
});
