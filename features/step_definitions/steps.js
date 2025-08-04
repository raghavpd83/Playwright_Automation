const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');


Given('login to eccomerce application with {string} and {string}', async function (email, password) {
  
  const loginPage = this.poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(email, password);
});

When('Add {string} is added to cart', async function (productName) {
  const dashBoardPage = this.poManager.getDashBoardPage();
  await dashBoardPage.searchProductsAddToCart(productName);
  await dashBoardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productName) {
  await this.page.locator("div li").first().waitFor();
  const isVisible = await this.page.locator(`h3:has-text("${productName}")`).isVisible();
  expect(isVisible).toBeTruthy();
});

When('Add valid details and place the order', async function () {
  await this.page.locator("text=Checkout").click();
  await this.page.locator("[placeholder*='Country']").pressSequentially("ind");

  const dropdown = this.page.locator(".ta-results");
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator("button").count();

  for (let i = 0; i < optionsCount; i++) {
    const text = await dropdown.locator("button").nth(i).textContent();
    if (text.trim() === 'India') {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  await this.page.locator("text=Place Order").click();
  await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  const orderId = await this.page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  console.log("Order ID placed: ", orderId);

  this.orderId = orderId;
});

Then('Verify the order in the order history page', async function () {
  await this.page.locator("button[routerlink*=myorders]").click();
  await this.page.locator("tbody").waitFor();

  const rows = await this.page.locator("tbody tr");

  for (let i = 0; i < await rows.count(); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (this.orderId.includes(rowOrderId.trim())) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  await this.browser.close();
});
