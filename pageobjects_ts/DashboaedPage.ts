import { Locator, test, type Page } from '@playwright/test';
export class DashboardPage
{
    page:Page;
    products:Locator;
    productText:Locator;
    cart:Locator;

    constructor(page)
    {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

    async searchProductsAddToCart(productName)
    {
           await this.products.first().waitFor();
           const titles = await this.productText.allTextContents();
           console.log(titles); 
           const count = await this.products.count();
           for (let i = 0; i < count; ++i) {
              if (await this.products.nth(i).locator("b").textContent() === productName) {
                 //add to cart
                 await this.products.nth(i).locator("text= Add To Cart").click();
                 break;
              }
           }
    }

    async navigateToCart()
    {
          await this.cart.click();
    }
}
module.exports = {DashboardPage};