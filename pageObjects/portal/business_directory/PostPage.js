class PostPage {

    constructor(page) {
        this.page = page
        this.header = page.locator('text=Post Business').nth(0)
        this.generalInformationHeader = page.locator('text=General Information')
        this.offerHeader = page.locator('text=Offer').nth(0)
        this.contactOptionsHeader = page.locator('text=Contact Options')
        this.logoHeader = page.locator('text=Logo')
        this.imageHeader = page.locator('text=Image').nth(0)
        this.assignedToInput = page.locator('[id="-input"]')
        this.businessNameInput = page.locator('[formcontrolname="name"]')
        this.headerInput = page.locator('[formcontrolname="descriptionHeader"]')
        this.categoryDropDown = page.locator('gw-select-filter mat-select')
        this.offerHeadlineInput = page.locator('[formcontrolname="offerHeadline"]')
        this.offerDescriptionInput = page.locator('[formcontrolname="offerDescription"]')
        this.linkUrlInput = page.locator('[formcontrolname="offerUrl"]')
        this.buttonText = page.locator('[formcontrolname="offerUrlText"]')
        this.phoneInput = page.locator('[formcontrolname="phone"]')
        this.locationInput = page.locator('mat-form-field [formcontrolname="location"]')
        this.uploadLogoButton = page.locator('.logo [id="camera-btn"]')
        this.uploadOwnCoverPhoto = page.locator('mat-radio-group mat-radio-button:first-of-type')
        this.chooseGenericImageRadioButton = page.locator('mat-radio-group mat-radio-button:last-of-type')
        this.postBusinessButton = page.locator('text=POST BUSINESS').nth(1)
        this.confirmPostButton = page.locator('text=TAKE ME THERE')
    }

    getHeader() {
        return this.header
    }

    getGeneralInformationHeader() {
        return this.generalInformationHeader
    }

    getOfferHeader() {
        return this.offerHeader
    }

    getContactOptions() {
        return this.contactOptionsHeader
    }

    getLogoHeader() {
        return this.logoHeader
    }

    getImageHeader() {
        return this.imageHeader
    }

    async enterAssignTo(_user) {
        await this.assignedToInput.click()
        await this.assignedToInput.fill(_user, {delay:100})
        this.userName = this.page.locator('.gw-option-for-select-info:has-text("'+_user+'")')
        await this.userName.click()
    }

    async enterBusinessName(_name) {
        await this.businessNameInput.click()
        await this.businessNameInput.fill(_name)
    }

    async enterHeader(_header) {
        await this.headerInput.click()
        await this.headerInput.fill(_header)
    }

    async clickCategory() {
        await this.categoryDropDown.click()
    }

    async clickChooseGenericImage() {
        await this.chooseGenericImageRadioButton.click()
    }

    async clickGenericImage(_image_no) {
        this.genericImage = this.page.locator('.thumbs img[src*="' + _image_no + '"]')
        await this.genericImage.click()
    }

    async clickPost() {
        await this.postBusinessButton.click()
    }

    async clickConfirmPost() {
        await Promise.all([
            this.page.waitForNavigation(),
            this.confirmPostButton.click()
        ])
    }
}
module.exports = {PostPage}