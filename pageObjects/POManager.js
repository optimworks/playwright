const {HomePage} = require("./HomePage")
const {FeedPage} = require("../pageObjects/portal/FeedPage")
const {NavigationUser} = require("./utilities/NavigationUser")
const {NavigationAdmin} = require("./utilities/NavigationAdmin")
const {MentoringProgramsBoardPage} = require("../pageObjects/admin/grad_careers/programs/MentoringProgramsBoardPage")
const {MentoringProgramsCardPage} = require("../pageObjects/admin/grad_careers/programs/MentoringProgramsCardPage")
const {MentoringProgramsPostPage} = require("../pageObjects/admin/grad_careers/programs/MentoringProgramsPostPage")
const {Scripts} = require("../pageObjects/utilities/Scripts")
const {ProfileViewPage} = require("../pageObjects/portal/ProfileViewPage")
const {BordPage} = require('../pageObjects/portal/business_directory/BoardPage')
const { CardPage } = require("./portal/business_directory/CardPage")
const { PostPage } = require("./portal/business_directory/PostPage")

class POManager {
    constructor(page) {
        this.page= page
        this.feedPage = new FeedPage(this.page)
        this.homePage = new HomePage(this.page)
        this.navigationUser = new NavigationUser(this.page)
        this.navigationAdmin = new NavigationAdmin(this.page)
        this.mentoringProgramsBoardPage = new MentoringProgramsBoardPage(this.page)
        this.mentoringProgramsCardPage = new MentoringProgramsCardPage(this.page)
        this.mentoringProgramsPostPage = new MentoringProgramsPostPage(this.page)
        this.scripts = new Scripts(this.page)
        this.profileViewPage = new ProfileViewPage(this.page)
        this.businessDirectoryBoardPage = new BordPage(this.page)
        this.businessDirectoryCardPage = new CardPage(this.page)
        this.businessDirectoryPostPage = new PostPage(this.page)
    }

    getFeedPage() {
        return this.feedPage
    } 

    getHomePage() {
        return this.homePage
    }

    getNavigationUser() {
        return this.navigationUser
    }

    getNavigationAdmin() {
        return this.navigationAdmin
    }

    getMentoringProgramsBoardPage() {
        return this.mentoringProgramsBoardPage
    }

    getMentoringProgramsCardPage() {
        return this.mentoringProgramsCardPage
    }

    getMentoringProgramsPostPage() {
        return this.mentoringProgramsPostPage
    }

    getScripts() {
        return this.scripts
    }

    getProfileViewPage() {
        return this.profileViewPage
    }

    getBusinessDirectoryBoardPage() {
        return this.businessDirectoryBoardPage
    }

    getBusinessDirectoryCardPage() {
        return this.businessDirectoryCardPage
    }

    getBusinessDirectoryPostPage() {
        return this.businessDirectoryPostPage
    }
}
module.exports = {POManager}