class MentoringProgramsPostPage {
    constructor(page) {
        this.page = page
        this.header = page.locator('[id="programs-header-title"]')
        this.nameInput = page.locator('[formcontrolname="name"]')
        this.createProgramButton = page.locator('[id="btn-create-program"] span:first-child')
        this.goToProgramsButton = page.locator('text=GO TO PROGRAM')
        this.nameLabel = page.locator('[id*="program-title_"] .gw-margin-no')
    }

    getHeader() {
        return this.header
    }

    getName() {
        this.nameLabel
    }

    async fillName(name) {
        await this.nameInput.click()
        await this.nameInput.fill(name)
    }

    async clickCreateProgram() {
        await this.createProgramButton.click()
        await this.goToProgramsButton.click()
    }

    async clickGoToPrograms() {
        await this.goToProgramsButton.click()
    }
}
module.exports = { MentoringProgramsPostPage }