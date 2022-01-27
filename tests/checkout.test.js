const timeout = 15000;

// Test des fonctionnalités de prise de commande
describe("Checkout process", () => {
    let page;

    test('checkout', async () => {
        await page.goto(process.env.TESTED_WEBSITE);
        await page.waitForSelector('body');
        await page.type('#user-name', process.env.TEST_LOGIN);
        await page.type('#password', process.env.TEST_PASSWORD);
        await page.click('#login-button');
        //add product to cart
        await page.click('#add-to-cart-sauce-labs-backpack')
        await page.goto(process.env.ADDED_TO_CART);
        await page.waitForSelector('body');
        let html = await page.$eval('#root', e => e.innerHTML)
        expect(html).toContain('div class="cart_item"')
        //Do the checkout
        await page.click('#checkout');
        await page.goto(process.env.CHECKOUT_PROCESS_ONE);
        await page.waitForSelector('body');
        html = await page.$eval('#root', e => e.innerHTML)
        await page.screenshot({path: './tests/img/checkout_first.png'});
        expect(html).toContain('div class="checkout_info"')
        await page.type('#first-name', process.env.FIRST_NAME);
        await page.type('#last-name', process.env.LAST_NAME);
        await page.type('#postal-code', process.env.POSTAL_CODE);
        await page.click('#continue');
        await page.goto(process.env.CHECKOUT_PROCESS_TWO);
        await page.waitForSelector('body');
        html = await page.$eval('#root', e => e.innerHTML)
        await page.screenshot({path: './tests/img/checkout_two.png'});
        expect(html).toContain('div class="summary_info"')
        await page.click('#finish');
        await page.goto(process.env.CHECKOUT_COMPLETE);
        await page.waitForSelector('body');
        html = await page.$eval('#root', e => e.innerHTML)
        await page.screenshot({path: './tests/img/checkout_complete.png'});
        expect(html).toContain('div class="complete-text"')
    }, timeout);
    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});