class NavigationUser {
    constructor(page) {
        this.page = page
        this.feedPage = page.locator('[id="gw-parent-menu-feed"] a span');
        this.adminViewButton = page.locator("text=ADMIN VIEW")
        this.userViewButton = page.locator("text=USER VIEW")
        this.settingsDropDown = page.locator('gw-user-avatar+button')
        this.logOutButton = page.locator('[id="gw-header-sign-out"]')
        this.businessDirectoryPage = page.locator('text=Business Directory')
    }

    async goToAdminView() {
        await Promise.all([
            this.page.waitForNavigation(),
            this.adminViewButton.click()
        ])
    }

    async goToFeed() {
        await Promise.all([
            this.page.waitForNavigation(),
            this.feedPage.click()
        ])
    }

    async goToBusinessDirectory() {
        await Promise.all([
            this.page.waitForNavigation(),
            this.businessDirectoryPage.click()
        ])
    }

    async clickSettingsDropDown() {
        await this.settingsDropDown.click()
    }

    async logOut() {
        await this.logOutButton.click()
    }
}
module.exports = { NavigationUser }