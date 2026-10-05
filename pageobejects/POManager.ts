import {Page} from '@playwright/test'
import { LoginPage } from "./loginPage"
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { OrdersHistoryPage } from "./OrdersHistoryPage";
import { OrdersReviewPage } from "./OrdersReviewPage";


export class POManager{


    page: Page;
   loginPage:  LoginPage
   dashboardPage:  DashboardPage;
   cartPage: CartPage
   ordersHistoryPage:  OrdersHistoryPage
   ordersReviewPage: OrdersReviewPage

constructor(page: Page){
    this.page=page;
    this.loginPage= new LoginPage(this.page);
    this.dashboardPage= new DashboardPage(this.page);
    this.cartPage= new CartPage(this.page);
    this.ordersHistoryPage= new OrdersHistoryPage(this.page);
    this.ordersReviewPage= new OrdersReviewPage(this.page);
    

}


getLoginPage()
{
    return this.loginPage;
}

getDashboardPage()
{
    return this.dashboardPage;
}

getCartPage()
{
    return this.cartPage;
}


getOrdersHistoryPage()
{
 return   this.ordersHistoryPage
}

getOrdersReviewPage()
{   
    return  this.ordersReviewPage
}


}