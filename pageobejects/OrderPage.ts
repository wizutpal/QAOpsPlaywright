import { Page, Locator} from '@playwright/test'


export class OrderPage {

    orderLink: Locator;
    orderPge: Locator;
    orderRows: Locator;
    orderIdDetails: Locator;
   orderId : Locator;

    constructor(page: Page) {
        this.orderLink = page.locator("[routerlink='/dashboard/myorders']");
        this.orderPge = page.locator("tbody");
        this.orderRows = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text")
        this.orderId= page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async checkOrder(orderId: string) {
        await this.orderLink.first().click()
        await this.orderPge.waitFor();

        for (let i = 0; i < await this.orderRows.count(); i++) {
            const rowOrderId: any = await this.orderRows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                //click on view
                await this.orderRows.nth(i).locator("button").first().click();

                break;
            }
        }

        const detailsText = await this.orderIdDetails.textContent();
        console.log(detailsText);
        return detailsText;
    }
}