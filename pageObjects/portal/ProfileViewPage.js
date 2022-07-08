class ProfileViewPage {

    constructor(page) {
        this.page = page
        this.userProfileJobTitle = page.locator('[id="viewUserProfileJobTitle"]')
        this.userFullName = page.locator('[id="viewUserProfileFullName"]')
    }

    async getUserDetails() {
        await this.userProfileJobTitle.waitFor()
    }

    getUserFullName() {
        return this.userFullName
    }
}
module.exports = { ProfileViewPage }