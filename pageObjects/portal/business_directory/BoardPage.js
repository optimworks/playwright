class BordPage {

    constructor(page) {
        this.page = page
        this.header = page.locator('text=Businesses')
        this.startPostingButton = page.locator('[id="btn_get-started__start"]')
        this.getStartedHeader = page.locator('.get-started__title')
        this.searchInput = page.locator('business-search input[type="text"]')
        this.optionsIcon = page.locator('[id*="business-list-item__menu-"] mat-icon')
        this.deleteButton = page.locator('[id*="mat-menu-panel-"] button:last-of-type')
        this.editButton = page.locator('[id*="mat-menu-panel-"] button:first-of-type')
        this.confirmDeleteButton = page.locator('mat-dialog-actions button:first-of-type')
        this.allBusinessesHeader = page.locator('businesses-list .business-list__title')
    }

    getHeader() {
        return this.header
    }

    getGetStartHeader() {
        return this.getStartedHeader
    }

    getAllBusinessHeader() {
        return this.allBusinessesHeader
    }

    async clickStartPosting() {
        await this.startPostingButton.click()
    }

    async search(_search) {
        await this.searchInput.click()
        await this.searchInput.fill(_search)
    }

    async clickOptions() {
        await this.optionsIcon.click()
    }

    async clickEdit() {
        await this.editButton.click()
    }

    async clickDelete() {
        await this.deleteButton.click()
    }

    async clickConfirmDelete() {
        await this.confirmDeleteButton.click()
    }
}
module.exports = {BordPage}