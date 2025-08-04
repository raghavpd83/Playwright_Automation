const {test,expect} = require('@playwright/test');

test ('Calendar Validation',async ({page})=>
{
    const month = "7";
    const date = "14";
    const year = "2025";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click()
    await page.locator(".react-calendar__year-view__months").nth(Number(month)-1).click();



}



)