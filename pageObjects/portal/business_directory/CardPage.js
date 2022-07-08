class CardPage {

    constructor(page) {
        this.page = page
        this.promoteBusinessToggle = page.locator('mat-slide-toggle .mat-slide-toggle-bar')
        this.backButton = page.locator('text=arrow_back')
        this.editButton = page.locator('text=edit ')
        this.deleteButton = page.locator('text=delete')
    }

    getBusinessName(_name) {
        return this.name = this.page.locator('[id*="business_name"]:has-text("' + _name + '")')
    }

    getPoster(_poster) {
        return this.page.locator('[id*="contactName"]:has-text("'+_poster+'")')
    }

    getDescription(_description) {
        return this.page.locator('.card-data__business-description__body:has-text("'+_description+'")')
    }

    async clickBackButton() {
        await this.backButton.click()
    }

    async clickEditButton() {
        await this.editButton.click()
    }

    async clickDeleteButton() {
        await this.deleteButton.click()
    }

    async clickPromoteBusinessToggle() {
        await this.promoteBusinessToggle.click()
    }
}
module.exports = { CardPage }