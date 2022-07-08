class MentoringProgramsBoardPage {
    constructor(page) {
        this.page = page
        this.header = page.locator('[id="programs-header-title"]')
        this.emptyListHeader = page.locator('#gw-landing-page-title')
        this.createNewProgramButton = page.locator('[id="landingPageBtn"] span:first-child')
        this.options = page.locator('gw-menu mat-icon')
        this.delete = page.locator('[id*="mat-menu-panel-"] button:nth-child(2) span')
        this.confirmDelete = page.locator('mat-dialog-container button:first-child span:first-child')

    }

    getHeader() {
        return this.header
    }

    getEmptyListHeader() {
        return this.emptyListHeader
    }

    async createProgram() {
        await this.createNewProgramButton.click()
    }

    async clickDelete() {
        await this.options.click()
        await this.delete.click()
        await this.confirmDelete.click()
    }
}
module.exports = { MentoringProgramsBoardPage }