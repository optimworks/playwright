const {test, expect} = require('@playwright/test')

test("Assertions", async ({page}) => {
    await Promise.all([
        page.waitForNavigation(),
        page.goto('')
    ]) 
    await page.waitForSelector('"Sign in"')
    await expect(page.isEnabled('"Sign in"')).toBeTruthy()

    console.log(await page.isEnabled('"Sign in"'));
    await page.click('"Sign in"')

    expect(await page.isEditable('[name="email"]')).toBeTruthy()
    console.log(await page.isEditable('[name="email"]'))
    console.log(await page.isVisible('[name="email"]'))

    expect(await page.isEditable('[name="password"]')).toBeTruthy()
    expect(await page.isVisible('[name="email"]')).toBeTruthy()

    await page.fill('[name="email"]', "graduway041@gmail.com")
    await page.fill('[name="password"]', "GraduwayAdmin123$")

    var value = await page.$eval('[name="email"]', (ele)=>ele.value)
    var value1 = await page.inputValue('[name="email"]')
    var value2 = await page.evaluate(el => el.value, await page.$('[name="email"]'))

    console.log("First value is : "+value1)
    console.log("Second value is : "+value)
    console.log("Third value is : "+value2)

    var value = await page.$eval('[name="password"]', (ele)=>ele.value)
    var value1 = await page.inputValue('[name="password"]')
    var value2 = await page.evaluate(el => el.value, await page.$('[name="password"]'))

    console.log("First pwd value is : "+value1)
    console.log("Second pwd value is : "+value)
    console.log("Third pwd value is : "+value2)

    await Promise.all([
        page.waitForNavigation(),
        page.locator('gw-login-form button:visible').click()
    ])
    await expect(page.isVisible('.post-dialog-trigger')).toBeTruthy()
    var loc = page.locator('feed-read-more p').nth(0)
    expect(await loc.textContent()).toEqual("Automation first feed post")
    console.log(await loc.textContent())

    var attribute = await loc.getAttribute('class')
    console.log("class value : "+attribute)
    await expect(loc).toHaveAttribute('class', 'gw-read-more gw-pre-line')
    console.log(await expect(loc).toHaveAttribute('class', 'gw-read-more gw-pre-line'))

    await expect(loc).toHaveClass('gw-read-more gw-pre-line')
})