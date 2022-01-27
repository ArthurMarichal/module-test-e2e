const timeout = 15000;

// Test des fonctionnalités de gestion du panier
describe("Cart features", () => {
    let page;

    test('add to cart', async () => {
        await page.goto(process.env.TESTED_WEBSITE);
        await page.waitForSelector('body');
        await page.type('#user-name', process.env.TEST_LOGIN);
        await page.type('#password', process.env.TEST_PASSWORD);
        await page.click('#login-button');
        await page.click('#add-to-cart-sauce-labs-backpack')
        await page.goto(process.env.ADDED_TO_CART);
        await page.waitForSelector('body');
        const html = await page.$eval('body', e => e.innerHTML)
        await page.screenshot({path: './tests/img/add_to_cart.png'});
        expect(html).toContain('div class="cart_item"')
    }, timeout);
    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});