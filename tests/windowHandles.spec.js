const { test } = require("@playwright/test")

test("Working on window handling", async ({ browser }) => {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://automation.qa.manual.graduway.com/")
    var openSignin = page.locator('text=Sign in')
    var userName = page.locator('[type="email"]')
    var password = page.locator('[type="password"]')
    var signin = page.locator('[name="signInButton"]')
    var feedPage = page.locator('[id="gw-parent-menu-feed"] a span')
    var link = page.locator('.website__content__description a')
    var whatsOnUrMind = page.locator('input[type="text"]')
    var optionsButton = page.locator('gw-menu mat-icon').nth(0)

    await openSignin.click()
    await userName.fill('graduway041@gmail.com')
    await password.fill('GraduwayAdmin123$')
    await Promise.all([
        page.waitForNavigation(),
        signin.click()
    ])

    await Promise.all([
        page.waitForNavigation(),
        feedPage.click()
    ])
    await whatsOnUrMind.click()
    await page.frameLocator('[class="tox-edit-area__iframe"]').locator('body').click()
    await page.frameLocator('[class="tox-edit-area__iframe"]').locator('body').fill('connect.graduway.com', {delay:100})
    await page.waitForTimeout(1000)
    await page.frameLocator('[class="tox-edit-area__iframe"]').locator('body').click()
    await page.waitForTimeout(2000)
    await page.locator('footer button span :first-child').click()

    var [newPage] = await Promise.all([
        context.waitForEvent('page'),
        link.click()
    ])
    var openSigninLink = newPage.locator('[type="button"] span .material-icons')
    var email = newPage.locator('[type="email"]')
    var pwd = newPage.locator('[type="password"]')
    var signinButton = newPage.locator('[name="signInButton"]')
    
    await openSigninLink.click()
    await email.fill('little-handsome@o7lx9xtd.mailosaur.net')
    await pwd.fill('GraduwayAdmin123$') 
    await signinButton.click()
    await page.bringToFront()
    await feedPage.click()
    //await whatsOnUrMind.click()
    await optionsButton.click()
    await page.click('"Delete"')
    await page.click('"DELETE"')
    await newPage.page()[1]
    await page.pause()
})