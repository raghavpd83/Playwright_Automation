import { Locator, test, type Page } from '@playwright/test';
export class LoginPage
{
    page:Page;
    email:Locator;
    password:Locator;
    signInButton:Locator;
    constructor(page)
    {
        this.page = page;
        this.email = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.signInButton = page.locator("[value='Login']");
    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

   async validLogin(email:string, password:string)
    {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = {LoginPage};