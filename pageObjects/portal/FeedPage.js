class FeedPage {
    constructor(page) {
        this.page = page
        this.signInDropDown = page.locator('[type="button"] span .material-icons');
        this.userName = page.locator('[type="email"]');
        this.password = page.locator('[type="password"]');
        this.signin = page.locator('[name="signInButton"]');
        this.feedPost = page.locator('feed-read-more .gw-read-more-text div')
        this.whatsOnUrMind = page.locator('input[type="text"]')
        this.link = page.locator('.website__content__description a')
        this.insertLink = page.locator('[title="Insert/edit link"]')
        this.windowDropdown = page.locator('.tox-form :nth-child(4) [id*="form-field_"]')
        this.currentWindow = page.locator('[title="Current window"]')
        this.postButton = page.locator('footer button span :first-child')
        this.feedItemPost = page.locator('feed-item-post .post-content')
        this.whatsOnUrMindLabel = page.locator('post-dialog-trigger .post-dialog-trigger')

    }

    getFeedPost() {
        return this.feedPost
    }

    getWhatsOnYourMindLabel() {
        return this.whatsOnUrMindLabel
    }

    getFeedItembody() {
        return this.feedItemPost
    }

    async clickWhatsOnYourMind() {
        await this.whatsOnUrMind.click()
    }

    async enterFeedPost(_feed_post) {
        await this.page.frameLocator('[class="tox-edit-area__iframe"]').locator('body').click()
        await this.page.frameLocator('[class="tox-edit-area__iframe"]').locator('body').fill(_feed_post, { delay: 1000 })
    }

    async insertLink() {
        await this.insertLink.click()
        await this.windowDropdown.click()
        await this.currentWindow.click()
    }

    async clickPost() {
        this.postButton.click()
    }

    async clickLink(uName, pwd) {
        const [newPage] = await Promise.all([
            this.page.waitForNavigation(),
            this.link.click()
        ])
        this.dropdown = newPage.locator(this.signInDropDown)
        this.email = newPage.locator(this.userName)
        this.pwd = newPage.locator(this.password)
        this.submit = newPage.locator(this.signin)
        await this.dropdown.click()
        await this.email.fill(uName)
        await this.pwd.fill(pwd)
        await this.submit.click()
    }
}
module.exports = { FeedPage }