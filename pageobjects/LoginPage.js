class LoginPage
{
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

   async validLogin(email, password)
    {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = {LoginPage};