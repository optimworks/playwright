const { test, expect } = require("@playwright/test")

test("DropDowns", async ({ page }) => {
    await page.goto("https://automation.qa.manual.graduway.com/")
    var openSignin = page.locator('[type="button"] span .material-icons')
    var userName = page.locator('[type="email"]')
    var password = page.locator('[type="password"]')
    var signin = page.locator('[name="signInButton"]')
    var feedPage = page.locator('[id="gw-parent-menu-feed"] a span')
    var whatsOnUrMind = page.locator('input[type="text"]')
    var insertLink = page.locator('[title="Insert/edit link"]')
    var dropDown = page.locator('.tox-form :nth-child(4) [id*="form-field_"]')
    var currentWindow = page.locator('[title="Current window"]')

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

    await Promise.all([
        page.waitForNavigation(),
        whatsOnUrMind.click()
    ])
    await insertLink.click()
    await dropDown.click()
    await currentWindow.click()

})

test("DropDown", async ({ page }) => {
    await page.goto("https://demo.guru99.com/test/newtours/")
    var registerLink = page.locator('[href="register.php"]').first()
    var dropDown = page.locator('[name="country"]')

    await registerLink.click()
    await dropDown.selectOption('INDIA')
    //await page.pause()
})

test("Checkbox", async ({ page }) => {
    await page.goto("https://automation.qa.manual.graduway.com/")
    var openSignin = page.locator('[type="button"] span .material-icons')
    var linkedIn = page.locator('gw-login-social span').first()
    var userName = page.locator('[id="username"]')
    var password = page.locator('[id="password"]')
    var submit = page.locator('[type="submit"]')
    var checkbox = page.locator('[id="basicProfileTermsOfUseCheckBox"] label')

    await openSignin.click()
    await linkedIn.click()
    await userName.fill("goes-wide@o7lx9xtd.mailosaur.net")
    await password.fill("GraduwayAdmin123$")
    await Promise.all([
        page.waitForNavigation(),
        submit.click()
    ])
    await checkbox.click()
    console.log(await checkbox.isChecked());
    await expect(checkbox).toBeChecked()
    await checkbox.uncheck()
    expect(await checkbox.isChecked()).toBeFalsy()
    //await page.pause()

})