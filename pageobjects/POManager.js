const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboaedPage');
class POManager
{
    constructor(page)
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