import { Page, Locator} from '@playwright/test'

export class LoginPage{

    page: Page;
    username: Locator;
    password: Locator;
    signInButton: Locator;
    

constructor(page: Page){
    this.page= page;
    this.username= page.locator('#userEmail');
    this.password=page.locator('#userPassword');
    this.signInButton=page.locator('#login')
}

async goto(){
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login")
}

async validLogin(username: string, password: string)
{
await this.username.fill(username)
await this.password.fill(password)
await this.signInButton.click()
await this.page.locator('.card-body h5').first().waitFor()



}

}