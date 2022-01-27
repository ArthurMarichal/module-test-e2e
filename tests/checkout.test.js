const timeout = 15000;

// Test des fonctionnalités de prise de commande
describe("Checkout process", () => {
    let page;

    test('checkout', async () => {
        await page.goto("https://www.saucedemo.com/");
        await page.waitForSelector('body');
        await page.type('#user-name', "standard_user");
        await page.type('#password', "secret_sauce");
        await page.click('#login-button');
        //add product to cart
        await page.click('#add-to-cart-sauce-labs-backpack')
        await page.goto("https://www.saucedemo.com/cart.html");
        await page.waitForSelector('body');
        let html = await page.$eval('#root', e => e.innerHTML)
        expect(html).toContain('div class="cart_item"')
        //Do the checkout
        await page.click('#checkout');
        await page.goto("https://www.saucedemo.com/checkout-step-one.html");
        await page.waitForSelector('body');
        html = await page.$eval('#root', e => e.innerHTML)
        await page.screenshot({path: './tests/img/checkout_first.png'});
        expect(html).toContain('div class="checkout_info"')
        await page.type('#first-name', "Arthur");
        await page.type('#last-name', "Marichal");
        await page.type('#postal-code', "0123456789");
        await page.click('#continue');
        await page.goto("https://www.saucedemo.com/checkout-step-two.html");
        await page.waitForSelector('body');
        html = await page.$eval('#root', e => e.innerHTML)
        await page.screenshot({path: './tests/img/checkout_two.png'});
        expect(html).toContain('div class="summary_info"')
        await page.click('#finish');
        await page.goto("https://www.saucedemo.com/checkout-complete.html");
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