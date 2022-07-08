class MentoringProgramsCardPage {
    constructor(page) {
        this.page = page
        this.emptyListHeader = page.locator('#gw-landing-page-title')
        this.addUsersButton = page.locator('[id="landingPageBtn"] span:first-child')
        this.allUsersRadioButton = page.locator('#users-all label')
        this.addUsersFilterButton = page.locator('#btn-filter-users span:first-child')
        this.goToProgramsButton = page.locator('text=GO TO PROGRAM')
        this.matchesTab = page.locator('[href*="matches"]')
        this.startMatching = page.locator('[id="landingPageBtn"] span:first-child')
        this.mentorsForMenteesRadioButton = page.locator('text=Suggested mentors for mentees')
        this.manualMatchButton = page.locator('text=Manual Match')
        this.showMatches = page.locator('[id="btn-show-matches"] span:first-child')
        this.UsreName = page.locator('text=Gia  Antony')
        this.matchButton = page.locator('matched-user-card-details button span').nth(0)
        this.suggestMatchButton = page.locator('mat-radio-button:last-child label :first-child').nth(0)
        this.mentorRadioButton = page.locator('#matching-member-type-mentor')
        this.continueButton = page.locator('#btn-matching-process-continue span:first-child')
        this.sendButton = page.locator('#matching-process-send-message span:first-child')
        this.menteesAllAvailableRadioButton = page.locator('[id="mentee-all"] label:first-child')
        this.mentorsChooseFromFiltersRadioButton = page.locator('[id="mentor-filters"] label:first-child')
        this.offeringMentoingDropDown = page.locator('[id="mentor-offering-filter"]')
        this.affiliationDropDown = page.locator('[id="mentor-filters"]+* [id="affiliation-filter"]')
        this.successfulLabel = page.locator('text=Message was sent successfully')
        this.suggestMatchBothRadioButton = page.locator('[id="matching-member-type-both"]')
        this.suggestMatchMenteeRadioButton = page.locator('matching-member-type-mentee')
    }

    getEmptyListHeader() {
        return this.emptyListHeader
    }

    async clickAddUsers() {
        await this.addUsersButton.click()
    }

    getSuggestedMentorsForMentees() {
        return this.page.locator('input[id="suggested-mentors-input"]')
    }

    getmenteesAllAvailableRadioButton() {
        return this.page.locator('[id="mentee-all-input"]')
    }

    getMentorChooseFromFiltersRadioButton() {
        return this.page.locator('[id="mentor-filters-input"]')
    }

    async selectAllUsersRadioButton() {
        await this.allUsersRadioButton.click()
        await this.addUsersFilterButton.click()
    }

    async goToProgram() {
        await this.goToProgramsButton.click()
    }

    async clickMatchTab() {
        await this.matchesTab.click()
    }

    async clickStartMatching() {
        await this.startMatching.click()
    }

    async selectMentorsForMenteeRadioButton() {
        await this.mentorsForMenteesRadioButton.click()
    }

    async selectAllMenteesRadioButton() {
        await this.menteesAllAvailableRadioButton.click()
        await this.page.mouse.down(0, 600)
    }

    async selectMentorsChooseFromFiltersRadioButton() {
        await this.mentorsChooseFromFiltersRadioButton.click()
    }

    async offeringMentoring(_item) {
        this.categiryFieldItem = this.page.locator('.mat-option-text:has-text("'+_item+'")')
        await this.offeringMentoingDropDown.click()
        await this.categiryFieldItem.click()
        await this.page.keyboard.press('Escape')
    }

    async chooseAffiliation(_item) {
        this.categiryFieldItem = this.page.locator('.mat-option-text:has-text("'+_item+'")')
        await this.affiliationDropDown.click()
        await this.categiryFieldItem.click()
        await this.page.keyboard.press('Escape')
    }

    async clickShowMatches() {
        await this.manualMatchButton.click()
        await this.showMatches.click()
    }

    async matchUser() {
        await this.UsreName.click()
        await this.matchButton.click()
    }

    async match(_name) {
        this.userName = this.page.locator('.user-name:has-text("'+_name+'")')
        await this.userName.click()
        await this.matchButton.click()
    }

    async chooseMentor() {
        await this.suggestMatchButton.click()
        await this.mentorRadioButton.click()
    }

    async selectBoth() {
        await this.suggestMatchButton.click()
        await this.suggestMatchBothRadioButton.click()
    }

    async send() {
        await this.continueButton.click()
        await this.sendButton.click()
        await this.successfulLabel.waitFor()
    }



}
module.exports = { MentoringProgramsCardPage }