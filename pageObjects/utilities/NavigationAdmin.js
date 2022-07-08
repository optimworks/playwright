class NavigationAdmin {
    constructor(page){
        this.page = page
        this.gradCareersButton = page.locator('[src*="product-title-careers"]')
        this.programsButton = page.locator('[id="gw-child-menu-mentorPrograms_Programs-of- "] span')
        
    }

    async goToGradCarees(){
        await this.gradCareersButton.click()
    }

    async goToPrograms(){
        await this.programsButton.click()
    }
}
module.exports = {NavigationAdmin}