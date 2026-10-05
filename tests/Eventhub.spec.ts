import {test, expect} from '@playwright/test'


test('Create a brand new event', async  ({page}) =>
{
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    const email= 'utpal@gmail.com'
    const password= 'Secret@123'
    const eventname= 'QA Workshop at Kolkata Eco'
    const custname= 'Utpal'
    await page.locator('#email').fill(email);
    await page.locator("#password").fill(password);
    await page.locator("#login-btn").click();
    await page.locator("h3").first().waitFor();

  
await page.getByRole("button", {name: 'Admin'}).click();
await page.locator("[href='/admin/events']").first().click();
await page.locator("#event-title-input").fill(eventname);
await page.locator("#city").fill("Kolkata");
await page.locator("#venue").fill("Eco Park");
await page.getByLabel('Event Date & Time').fill('2026-09-27T07:42');
await page.locator("input[id='price-($)']").fill("200");
await page.locator("#total-seats").fill("500");
await page.locator("[type='submit']").click();

await page.locator("#nav-home").click();
const eventCards = page.locator("div.p-4");
const eventCount = await eventCards.count();

for (let i = 0; i < eventCount; i++) {
    const card = eventCards.nth(i);
    const title = await card.locator("a .font-semibold").innerText();
    if (title.trim() === eventname.trim()) {
        await card.locator("#book-now-btn").click();
        break;
    }
}

await page.locator("#customerName").fill(custname);
await page.locator("#customer-email").fill(email);
await page.locator("#phone").fill("1235646875")
await page.locator("#confirm-booking").click();




    const seatLeft= await page.locator(".text-amber-600").first().textContent()
    const beforeSeatBooking= seatLeft?.split(" ")[0];
    console.log(beforeSeatBooking);
   



})
