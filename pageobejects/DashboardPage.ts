import { Page, Locator} from '@playwright/test'

export class DashboardPage{

    page :Page;
    products: Locator;
    productsText: Locator;
    cart: Locator;
    chckoutPage: Locator;
    orders: Locator;

    constructor(page: Page)
    {
        this.page= page;
        this.products=page.locator('.card-body');
        this.productsText=page.locator('.card-body b');
        this.cart= page.locator("[routerlink*=cart]");
        this.chckoutPage= page.locator("div li");
        this.orders = page.locator("button[routerlink*='myorders']");
    }

  async searchProductAddCart(productName:string)
    {
const titles = await this.productsText.allTextContents();
const count= await this.products.count();

for(let i=0; i<count; i++){
if(await this.products.nth(i).locator('b').textContent() === productName){
    //add to cart
    await this.products.nth(i).locator("text= Add to Cart").click();
    break;
}
}
}

async navigateToCart(){
    await this.cart.click();
    await this.chckoutPage.first().waitFor();
}
async navigateToOrders()
{
    await this.orders.click();
}

}