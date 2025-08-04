 
 
 
 
const { test, expect } = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');
const dataset = require('../utils/TestData.json');
 
 
for(const data of dataset) 
{
test(`@Webst Client App login for ${data.productName}`, async ({ page }) => {
   //js file- Login js, DashboardPage
 
   const poManager = new POManager(page);
   const loginPage = poManager.getLoginPage();
   await loginPage.goTo();
   await loginPage.validLogin(data.email, data.password);
   const dashBoardPage = poManager.getDashBoardPage();
   await dashBoardPage.searchProductsAddToCart(data.productName);
   await dashBoardPage.navigateToCart();
 
   await page.locator("div li").first().waitFor();
   const boolean = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(boolean).toBeTruthy();

   await page.locator("text=Checkout").click();
   await page.locator("[placeholder*='Country']").pressSequentially("ind");
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i=0;i<optionsCount;i++)
   {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === ' India')
      {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
   expect (await page.locator(".user__name [type='text']").first()).toHaveText(data.email);
   await page.locator(".action__submit").click();
   await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

   await page.locator("button[routerlink*=myorders]").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
   for (let i=0;i<await rows.count();i++)
   {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId))
      {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }

}
);
}