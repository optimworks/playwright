const { test, expect } = require('@playwright/test')
var { POManager } = require("../pageObjects/POManager")
var nodemailer = require('nodemailer');
var TestData = require("./data/credentials.json")
var MentoringMatchingData = require('./data/mentoring_matching.json')

var page, poManager, homePage, feedPage, navigationUser, navigationAdmin, mentoringProgramsBoardPage,
    mentoringProgramsCardPage, mentoringProgramsPostPage, scripts, email, profileViewPage

test.describe.configure({ mode: 'serial' });
test.describe("@MM Matching mentors for mentees->All to filters->affiliation", () => {

    test.beforeAll(async ({ browser }) => {
        var context = await browser.newContext()
        page = await context.newPage()
        poManager = new POManager(page)
        homePage = poManager.getHomePage()
        feedPage = poManager.getFeedPage()
        navigationUser = poManager.getNavigationUser()
        navigationAdmin = poManager.getNavigationAdmin()
        mentoringProgramsBoardPage = poManager.getMentoringProgramsBoardPage()
        mentoringProgramsCardPage = poManager.getMentoringProgramsCardPage()
        mentoringProgramsPostPage = poManager.getMentoringProgramsPostPage()
        scripts = poManager.getScripts()
        profileViewPage = poManager.getProfileViewPage()
        await homePage.goTo()
    })

    test.afterAll(async ({ browser }) => {
        await browser.close()
        return new Promise(function (fulfill, reject) {
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: '',//sender mail id
                    pass: ''//suresh sender mail access password
                }
            });
            var mailOptions = {
                from: '',//sender mail id
                to: '',//receipient mail id
                subject: 'Test_Report',
                text: 'Test_Report for Playwright tests',
                attachments: [{
                    'path': 'playwright-report/index.html',
                }]
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(error);
                    return console.log(error);
                }
                console.log('Mail sent: ' + info.response);
                fulfill(info);
            });
        });
    })

    test('Login with Admin', async () => {
        await homePage.openSignInOptions()
        await homePage.emailAndPasswordLogin(TestData.uName, TestData.pwd)
        await expect(feedPage.getWhatsOnYourMindLabel()).toBeVisible()
    })
    test("Go to Programs", async () => {
        await navigationUser.goToAdminView()
        await navigationAdmin.goToGradCarees()
        await navigationAdmin.goToPrograms()
        await expect(mentoringProgramsBoardPage.getHeader()).toHaveText("Programs")
        await expect(mentoringProgramsBoardPage.getEmptyListHeader()).toHaveText('Your Programs List Is Empty')
    })
    test("Create page loaded", async () => {
        await mentoringProgramsBoardPage.createProgram()
        await expect(mentoringProgramsPostPage.getHeader()).toHaveText('Create Program')
    })
    test("Create new program", async () => {
        await mentoringProgramsPostPage.fillName(TestData.name)
        await mentoringProgramsPostPage.clickCreateProgram()
        expect(await mentoringProgramsPostPage.getName().textContent()).toEqual(TestData.name)
    })
    test("Add users", async () => {
        await mentoringProgramsCardPage.clickAddUsers()
        await mentoringProgramsCardPage.selectAllUsersRadioButton()
        await mentoringProgramsPostPage.clickGoToPrograms()
    })
    test("Start Matching", async () => {
        await mentoringProgramsCardPage.clickMatchTab()
        await mentoringProgramsCardPage.clickStartMatching()
    })
    test("Select Mentors for Mentees", async () => {
        await mentoringProgramsCardPage.selectMentorsForMenteeRadioButton()
        await expect(mentoringProgramsCardPage.getSuggestedMentorsForMentees()).toBeChecked()
    })
    test("Select mentees filters and all Mentors", async () => {
        await mentoringProgramsCardPage.selectAllMenteesRadioButton()
        await mentoringProgramsCardPage.selectMentorsChooseFromFiltersRadioButton()
        await expect(mentoringProgramsCardPage.getmenteesAllAvailableRadioButton()).toBeChecked()
        await expect(mentoringProgramsCardPage.getMentorChooseFromFiltersRadioButton()).toBeChecked()
    })
    test("Remove offering mentoring", async () => {
        await mentoringProgramsCardPage.offeringMentoring(MentoringMatchingData.offering1)
        await mentoringProgramsCardPage.offeringMentoring(MentoringMatchingData.offering2)
        await mentoringProgramsCardPage.offeringMentoring(MentoringMatchingData.offering3)
    })
    test("Choose affiliation filter", async () => {
        await mentoringProgramsCardPage.chooseAffiliation(MentoringMatchingData.affiliationItem)
    })
    test("Choose Manual Match and Show matches", async () => {
        await mentoringProgramsCardPage.clickShowMatches()
    })
    test("Open mentee result", async () => {
        await mentoringProgramsCardPage.match(TestData.userName)
    })
    test("Suggest to Mentor", async () => {
        await mentoringProgramsCardPage.selectBoth()
    })
    test("Send", async () => {
        await mentoringProgramsCardPage.send()
    })
    test("Logging out from admin", async () => {
        await navigationUser.clickSettingsDropDown()
        await navigationUser.logOut()
        await expect(homePage.getSignInDropDown()).toBeVisible()
    })
    test("Login with Mentor", async () => {
        await homePage.openSignInOptions()
        await homePage.emailAndPasswordLogin(TestData.mentorEmail, TestData.pwd)
        await expect(feedPage.getWhatsOnYourMindLabel()).toBeVisible()
    })
    test("Mail should received", async () => {
        email = await scripts.getEmailById(TestData.mentorEmail)
        var text = await email.subject
        await expect(text).toEqual('We’ve found a great match for you')
    })
    test("Open email and show mentee user profile", async () => {
        var link = await email.html.links[1].href;
        await Promise.all([
            page.waitForNavigation(),
            page.goto(link)
        ])
        await profileViewPage.getUserDetails()
        await expect(profileViewPage.getUserFullName()).toHaveText("Spider Man")
    })
    test("Logging out from Mentor", async () => {
        await navigationUser.clickSettingsDropDown()
        await navigationUser.logOut()
        await expect(homePage.getSignInDropDown()).toBeVisible()
    })
    test("Login with admin", async () => {
        await homePage.openSignInOptions()
        await homePage.emailAndPasswordLogin(TestData.uName, TestData.pwd)
        await expect(feedPage.getWhatsOnYourMindLabel()).toBeVisible()
    })
    test("Go to programs", async () => {
        await navigationUser.goToAdminView()
        await navigationAdmin.goToGradCarees()
        await navigationAdmin.goToPrograms()
        await expect(mentoringProgramsBoardPage.getHeader()).toHaveText("Programs")
    })
    test("Delete Program", async () => {
        await mentoringProgramsBoardPage.clickDelete()
    })
    test("Logging out from Admin", async () => {
        await navigationUser.clickSettingsDropDown()
        await navigationUser.logOut()
        await expect(homePage.getSignInDropDown()).toBeVisible()
    })

})