//Author: Raghavendra
const {test, expect} = require('@playwright/test');
const { sign } = require('crypto');

test('Brwoser context Playwright test', async ({browser})=> 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("input#username");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshetty");
    await page.locator("[type*='password']").fill("learning");
    await signIn.click();

    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();

    //await page.waitForLoadState('networkidle');
    await cardTitles.first().waitFor();
    const titles = await cardTitles.allTextContents();
    console.log(titles);
}
)
test ('UI Controls', async ({page})=> 
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const dropDown = page.locator("select.form-control");
    const radioButton = page.locator(".radiotextsty").last();
    const checkBox = page.locator("#terms");
    const signIn = page.locator("#signInBtn");
    const documentLink = page.locator("[hrefx*='documents']");
    await dropDown.selectOption("consult");
    
    await radioButton.click();
    await page.locator("#okayBtn").click();
    console.log(radioButton.isChecked());
    await expect(radioButton).toBeChecked();

    
    await checkBox.click();
    await expect(checkBox).toBeChecked();
    await checkBox.uncheck();
    expect(await (checkBox).isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");

    
    await signIn.click();

    //await page.pause();
})

test ('Child Window Handle', async ({browser})=> 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents']");
    const userName = page.locator("input#username");
    

   const [newPage] = await Promise.all(
    [context.waitForEvent('page'),
    documentLink.click(),]
   )

   const text = await newPage.locator(".red").textContent();
   console.log(text);

   const text1 = text.split("@")
   const domain = text1[1].split(" ")[0]
   await userName.fill(domain);
   const domainName = await userName.inputValue();
   console.log(domainName);
   
}
)