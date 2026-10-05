import { Page, Locator} from '@playwright/test'

export class CheckoutPage{
    page: Page;
   checkoutBtn : Locator;
    cvv: Locator;
    cardName: Locator;
    coupon: Locator;
   country : Locator;
    dropdown: Locator;
   placeOrder : Locator;
   successMsg: Locator;

    constructor(page: Page){
        this.page= page;
        this.checkoutBtn= page.locator("text= Checkout");
        this.cvv= page.locator("[type='text']");
        this.cardName=page.locator("[type='text']");
        this.coupon= page.locator("[type='text']");
        this.country=page.locator("[placeholder*='Country']");
        this.dropdown= page.locator('.ta-results');
        this.placeOrder= page.locator(".action__submit");
        this.successMsg=page.locator(".hero-primary");

    }

    async checkout(){     
        await this.checkoutBtn.click();
        await this.cvv.nth(1).fill('256');
        await this.cardName.nth(2).fill('utpal');
        await this.coupon.nth(3).fill('rahulshettyacademy');
        await this.country.pressSequentially("ind");
        const dropdown= this.dropdown;
        await dropdown.waitFor();
        const optionsCount= await dropdown.locator('button').count();
        for (let i= 0; i< optionsCount; i++){
           const text= await dropdown.locator("button").nth(i).textContent();
            if(text === ' India'){
                //click
                dropdown.locator("button").nth(i).click()
                break;
            }
        }
        await this.placeOrder.click()
        await this.successMsg.waitFor()
    }
}