const { test, expect } = require('@playwright/test')
const { POManager } = require('../pageObjects/POManager')
var nodemailer = require('nodemailer');
const CredentialsData = require('./data/credentials.json')
var BusinessDirectoryData = require("./data/business_directory.json")

var context, page, poManager, homePage, feedPage, businessDirectoryBoardPage, businessDirectoryCardPage, businessDirectoryPostPage,
    navigationUser, navigationAdmin, scripts

test.describe.configure({ mode: 'serial' });
test.describe("@MM Business directory-->Post with Generic Image", () => {

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext()
        page = await context.newPage()
        poManager = new POManager(page)
        homePage = poManager.getHomePage()
        feedPage = poManager.getFeedPage()
        businessDirectoryBoardPage = poManager.getBusinessDirectoryBoardPage()
        businessDirectoryCardPage = poManager.getBusinessDirectoryCardPage()
        businessDirectoryPostPage = poManager.getBusinessDirectoryPostPage()
        navigationUser = poManager.getNavigationUser()
        navigationAdmin = poManager.getNavigationAdmin()
        scripts = poManager.getScripts()
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
    test.describe("Login with admin", () => {
        test("Successful", async () => {
            await homePage.openSignInOptions()
            await homePage.emailAndPasswordLogin(CredentialsData.uName, CredentialsData.pwd)
            await expect(feedPage.getWhatsOnYourMindLabel()).toBeVisible()
        })
    })
    test.describe("Go to business directory", () => {
        test("Board page Loaded", async () => {
            await navigationUser.goToBusinessDirectory()
            await expect(businessDirectoryBoardPage.getHeader()).toHaveText("Businesses")
            await expect(businessDirectoryBoardPage.getGetStartHeader()).toHaveText("Get Started")
        })
        test("Post page loaded", async () => {
            await businessDirectoryBoardPage.clickStartPosting()
            await expect(businessDirectoryPostPage.getHeader()).toBeVisible('Post Business')
            await expect(businessDirectoryPostPage.getGeneralInformationHeader()).toBeVisible('General Information')
            await expect(businessDirectoryPostPage.getOfferHeader()).toBeVisible('Offer')
            await expect(businessDirectoryPostPage.getContactOptions()).toBeVisible('Contact Options')
            await expect(businessDirectoryPostPage.getLogoHeader()).toBeVisible('Logo')
            await expect(businessDirectoryPostPage.getImageHeader()).toBeVisible('Image')
        })
        test("Fill details", async () => {
            await businessDirectoryPostPage.enterAssignTo(CredentialsData.userName)
            await businessDirectoryPostPage.enterBusinessName(BusinessDirectoryData.name)
            await businessDirectoryPostPage.enterHeader(BusinessDirectoryData.header)
            await scripts.enterIframeValue(BusinessDirectoryData.description)
            await businessDirectoryPostPage.clickCategory()
            await scripts.clickCategoryFieldItem(BusinessDirectoryData.categoryFieldItem)
            await scripts.pressEscape()
        })
        test("Choose generic image", async () => {
            await businessDirectoryPostPage.clickChooseGenericImage()
            await businessDirectoryPostPage.clickGenericImage(BusinessDirectoryData.imageIndex)
        })
        test("Post", async () => {
            await businessDirectoryPostPage.clickPost()
            await businessDirectoryPostPage.clickConfirmPost()
            await expect(businessDirectoryCardPage.getBusinessName(BusinessDirectoryData.name)).toHaveText(BusinessDirectoryData.name)
            await expect(businessDirectoryCardPage.getPoster(CredentialsData.userName)).toHaveText(CredentialsData.userName)
            await expect(businessDirectoryCardPage.getDescription(BusinessDirectoryData.description)).toHaveText(BusinessDirectoryData.description)
        })
        test("Go to board", async () => {
            await businessDirectoryCardPage.clickBackButton()
            await expect(businessDirectoryBoardPage.getAllBusinessHeader()).toHaveText('All Businesses')
        })
        test("Delete", async () => {
            await businessDirectoryBoardPage.clickOptions()
            await businessDirectoryBoardPage.clickDelete()
            await businessDirectoryBoardPage.clickConfirmDelete()
        })
        test("Logging out from admin", async () => {
            await navigationUser.clickSettingsDropDown()
            await navigationUser.logOut()
            await expect(homePage.getSignInDropDown()).toBeVisible()
        })
    })
})