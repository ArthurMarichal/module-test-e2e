const timeout = 15000;

// Test des fonctionnalités d'authentification
describe("Auth features", () => {
    let page;

    test('login and logout', async () => {
        await page.goto("https://www.saucedemo.com/");
        await page.waitForSelector('body');
        await page.type('#user-name', "standard_user");
        await page.type('#password', "secret_sauce");
        await page.click('#login-button');
        //user is connected and try to logout
        let html = await page.$eval('#root', e => e.innerHTML);
        await expect(html).toContain('id="inventory_container"');
        await page.click('#react-burger-menu-btn');
        await page.screenshot({path: './tests/img/login_completed.png'});
        await page.waitFor(500);
        expect(html).toContain('id="logout_sidebar_link"');
        await page.click('#logout_sidebar_link');
        html = await page.$eval('#root', e => e.innerHTML);
        await page.screenshot({path: './tests/img/logout_completed.png'});
        expect(html).toContain('div class="login_wrapper"')
    }, timeout);

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});