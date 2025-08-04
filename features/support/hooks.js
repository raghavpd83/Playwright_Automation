const { Given, When, Then, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');
const { Before, After } = require("@cucumber/cucumber");


Before(async function () {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    this.browser = browser;
    this.context = context;
    this.page = page;
    

    this.poManager = new POManager(page);
});

BeforeStep (function(){

});

AfterStep (async function({result})
{
    if (result.status ===Status.FAILED)
    {
        await this.page.screenshot({path: 'screenshot1.png'});
    }
})

After(function()
{

    console.log("This is the last test");
}
)