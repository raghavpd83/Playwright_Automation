const {test, expect,request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils.spec');
const loginPayLoad = {userEmail:"raghavpd83@gmail.com",userPassword:"P@ssw0rd123"};
const orderPayLoad = {orders:[{country:"American Samoa",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]}
let response;

test.beforeAll(async()=>
{

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
   
})



test.only('Client App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   page.addInitScript(value=>

    {
        window.localStorage.setItem('token',value)
    }, response.token
   );
   
   await page.goto("https://rahulshettyacademy.com/client");
   
   
   await page.locator("button[routerlink*=myorders]").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
   for (let i=0;i<await rows.count();i++)
   {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (response.orderId.includes(rowOrderId))
      {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }

})