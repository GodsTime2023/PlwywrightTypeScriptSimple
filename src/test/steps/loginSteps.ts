import { Given, When, Then } from '@cucumber/cucumber';  
import { config } from '../hooks/config';
import { loginPage } from '../pages/loginpage';

let login: loginPage;

Given('user is on login page', async function () {
    const page = config.getPage();       // get page from config
    await config.getUrl();
    login = new loginPage(page);         // instantiate page object
    await login.expectOnLoginPage();     // verify we are on login pag
});      

When('user enter valid creds', async function (dataTable) {
    const rows = dataTable.hashes(); 
    const { username, password } = rows[0];
    await login.enterUserNameAndPassword(username, password);
});    

Then('user is logged in', async function (dataTable) {
    const rows = dataTable.hashes(); 
    const { username} = rows[0];
    await login.isUserLoggedInAs(username)
});      