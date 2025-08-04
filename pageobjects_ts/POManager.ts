
import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboaedPage';
import { test, type Page } from '@playwright/test';

export class POManager
{

    page:Page;
    loginPage: LoginPage;
    dashBoardPage:DashboardPage;
    constructor(page:Page)
    
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashBoardPage = new DashboardPage(this.page);
    }

    getLoginPage()
    {
        return this.loginPage;
    }

    getDashBoardPage()
    {
        return this.dashBoardPage;
    }
}
module.exports = {POManager};