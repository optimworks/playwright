const { test, expect } = require("@playwright/test")

test("Launch browser using context", async function ({ browser }) {
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://automation.qa.manual.graduway.com/")
    console.log(await page.title());
    await expect(page).toHaveTitle('automationqa')
    var openSignin = page.locator('[type="button"] span .material-icons')
    var userName = page.locator('[type="email"]')
    var password = page.locator('[type="password"]')
    var signin = page.locator('[name="signInButton"]')
    var feedPage = page.locator('[id="gw-parent-menu-feed"] a span')
    var text1 = page.locator('feed-read-more .gw-read-more-text div')

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

    var feedText = await text1.nth(0).textContent()
    console.log(feedText)
    //await page.waitForLoadState('networkidle') //dynamic waits
    var text2 = await text1.allTextContents()
    console.log(text2)
    //await page.pause()
})

test("Launch browser using page", async function ({ page }) {
    await page.goto("https://automation.qa.manual.graduway.com/")
    console.log(await page.title())
    var openSignin = page.locator('[type="button"] span .material-icons')
    var userName = page.locator('[type="email"]')
    var password = page.locator('[type="password"]')
    var signin = page.locator('[name="signInButton"]')
    var feedPage = page.locator('[id="gw-parent-menu-feed"] a span')
    var text1 = page.locator('feed-read-more .gw-read-more-text div')

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
    var text2 = await text1.allTextContents()
    console.log(text2)
})