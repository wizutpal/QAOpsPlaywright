import { expect, test } from '@playwright/test';

test('Browser Context Playwright Test', async ({browser}) =>
{   
    

    //chrome - cookies/plugins we can send inside newContext(), so that the browser gets those
    const context = await browser.newContext()
    const page = await context.newPage();
    const userName= page.locator('#username');
    const passWord=page.locator('#password');
    const terms=page.locator('#terms');
    const signIn=page.locator('#signInBtn');
    const cardTitles= page.locator(".card-title a");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await userName.fill('Utpal')
    await passWord.fill('learing')
    await terms.click();
     await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password');
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await passWord.fill("")
    await passWord.fill("Learning@830$3mK2")
    await signIn.click();
    const iphone=  await cardTitles.nth(0).textContent();
     expect(iphone).toContain("iphone")
    const allTitles= await cardTitles.allTextContents();
    console.log(allTitles);
    
});


test ('Page Plawright test', async ({page}) =>
{
    //If page fixture is directly sent as above, by def context and page is set
    await page.goto('https://google.com');
    //get title assertion
    console.log(await page.title());
    await expect(page).toHaveTitle('Google');
})

test ('UI Controls', async ({page}) =>
{
  
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
   const userName=  page.locator('#username')
   const passWord=  page.locator('#password')
   const dropDown= page.locator('select.form-control') 
   const documentLink= page.locator("[href*='documents-request']");
    

   await userName.fill('rahulshettyacademy');
   await passWord.fill('Learning@830$3mK2');
   dropDown.selectOption('consult');
   await page.locator('.radiotextsty').last().click()
   await page.locator('#okayBtn').click()
    //assertion on radio 
   await expect (page.locator('.radiotextsty').last()).toBeChecked();
   //Assertion on Checkbox
   await page.locator('#terms').click();
   expect( page.locator('#terms')).toBeChecked();
   await page.locator('#terms').uncheck();
   expect(await page.locator('#terms').isChecked()).toBeFalsy();

   await expect(documentLink).toHaveAttribute("class","blinkingText")
})

test.only ('Child Window Control',async ({browser})=>
{
     const context = await browser.newContext()
    const page = await context.newPage();
    const userName= page.locator('#username');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink= page.locator("[href*='documents-request']");
   
   const [newPage]= await Promise.all([
    context.waitForEvent('page'),
    documentLink.click()
   ])

   const text= await newPage.locator('.red').textContent();
   const arrayText= text.split("@");
   const domain= arrayText[1].split(" ")[0]
   //console.log(domain);
   await userName.fill(domain);

   console.log(await userName.inputValue());
   

   

}

)