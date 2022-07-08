class HomePage {

    constructor(page) {
        this.page = page
        this.signInDropDown = page.locator('[type="button"] span .material-icons');
        this.userName = page.locator('[type="email"]');
        this.password = page.locator('[type="password"]');
        this.signin = page.locator('[name="signInButton"]');
    }

    async goTo() {
        await this.page.goto("")
    }

    async openSignInOptions() {
        await this.signInDropDown.click()
    }

    getSignInDropDown() {
        return this.signInDropDown
    }

    async emailAndPasswordLogin(uName, pwd) {
        await this.userName.fill(uName)
        await this.password.fill(pwd)
        await Promise.all([
            this.page.waitForNavigation(),
            this.signin.click()
        ])
    }

    
}
module.exports = { HomePage }