import {test, expect} from '@playwright/test'

test("Screenshot & Visual Comparision", async({page})=>{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
expect(page.locator("#displayed-text")).toBeVisible();
await page.locator("#displayed-text").screenshot({path: "Screenshot.png"})
await page.locator("#hide-textbox").click()
//await page.screenshot({path: "screenshot.png"})
expect(page.locator("#displayed-text")).toBeHidden();

})

//screenshot > Store > Compare

test.only("Visual Comparison", async ({page})=>{
    await page.goto("https://www.flightaware.com/")
    expect (await page.screenshot()).toMatchSnapshot("landinig.png")
})