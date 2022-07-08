const base = require('@playwright/test')

exports.customtest = base.test.extend({
    testData : {
        userName : "graduway041@gmail.com",
        password : "GraduwayAdmin123$",
    }
})