import{test,expect} from '@playwright/test'

test('Playwright Special Locators', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Gender").selectOption("Female")
    await page.getByLabel("Employed").check();
    await page.getByPlaceholder("Password").fill("Abc@123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!").isVisible()
    await page.getByRole("link",{name: 'Shop'}).click();
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();
})

test.only('Playwright Test Level Timeout', async ({page}) =>
{
    const slowExpect= expect.configure({timeout: 20000})
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Gender").selectOption("Female")
    await page.getByLabel("Employed").check();
    await page.getByPlaceholder("Password").fill("Abc@123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!").isVisible()
    
   

    //5 seconds wait is set in global level in playwright config. Below is set as step level wait
    expect (page.getByText("Success! The Form has been submitted successfully!")).toBeVisible({timeout: 10000})

    await page.getByRole("link",{name: 'Shop'}).click();
    slowExpect(page.locator(".my-4").first()).toHaveText("Shop Name");
     await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();
})