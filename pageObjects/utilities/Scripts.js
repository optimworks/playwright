const MailosaurClient = require('mailosaur')
const fs = require('fs');
const editJsonFile = require("edit-json-file");

class Scripts {

    constructor(page) {
        this.page = page
        this.mailosaur = new MailosaurClient('qTRvkx7AlFFLQNf')
        this.server_id = 'o7lx9xtd'
        this.serverDomain = 'o7lx9xtd.mailosaur.net'
        this.emaiAddress = 'jack-independent@' + this.serverDomain

    }

    async enterIframeValue(_value) {
        this.iframe = this.page.frameLocator('iframe.tox-edit-area__iframe')
        await this.iframe.locator('body').click()
        await this.iframe.locator('body').fill(_value)
    }

    async clickCategoryFieldItem(_item) {
        this.categoryFieldItem = this.page.locator('.mat-option-text:has-text("' + _item + '")')
        await this.categoryFieldItem.click()
    }

    async pressEscape() {
        await this.page.keyboard.press('Escape')
    }

    async getEmailAddress() {
        return await mailosaur.servers.generateEmailAddress(this.server_id);
    }

    async getEmailById(emailId) {
        const message = await this.mailosaur.messages.get(this.server_id, {
            sentTo: emailId
        });
        return await message;
    }

    async deleteEmail(emailId) {
        const message = await this.mailosaur.messages.get(this.server_id, {
            sentTo: emailId
        });
        await this.mailosaur.messages.del(message.id)
    }

    async deleteAllEmails() {
        await this.mailosaur.messages.deleteAll(this.server_id)
    }

    async deleteEmailById() {
        const message = await this.mailosaur.messages.get(this.server_id, {
            sentTo: emailId
        });
        await this.mailosaur.messages.del(message.id);
    }

    async writeToJson(dataJson) {
        let data = JSON.stringify(dataJson);
        fs.writeFileSync('user_credentials.json', data);
    }

    async writeToJson1(filePath, dataJson) {
        let data = JSON.stringify(dataJson);
        fs.writeFileSync(filePath, data);
    }

    async appendToJson(filePath, dataJson) {
        let data = JSON.stringify(dataJson);
        fs.appendFileSync(filePath, data)
    }

    async addToJson(jsonFilePath, key, value) {
        var file = editJsonFile(jsonFilePath, {
            autosave: true
        });
        file.set(key, value);
        file.save();
    }
}
module.exports = { Scripts }