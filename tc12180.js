import { Selector } from 'testcafe';

let main_matrix = [["for_em", "for_mn", "for_hr", "role", "any", "oi", "all", "dir", "sub"],
                       ["true", "true", "true", "em", "can", "can", "can", "skip", "skip"],  // 1
                       ["true", "true", "true", "mn", "can", "can", "can", "can", "can"],  // 2
                       ["true", "true", "true", "hr", "can", "can", "can", "skip", "skip"],  // 3
                       ["true", "true", "true", "hrmn", "skip", "skip", "skip", "skip", "skip"],  // 4
                       ["true", "false", "true", "em", "can", "can", "can", "skip", "skip"],  // 5
                       ["true", "false", "true", "mn", "can", "can", "can", "can", "can"],  // 6
                       ["true", "false", "true", "hr", "can", "can", "can", "skip", "skip"],  // 7
                       ["true", "false", "true", "hrmn", "skip", "skip", "skip", "skip", "skip"],  // 8
                       ["true", "false", "false", "em", "can", "can", "can", "skip", "skip"],  // 9
                       ["true", "false", "false", "mn", "can", "can", "can", "can", "can"],  // 10
                       ["true", "false", "false", "hr", "can", "can", "can", "skip", "skip"],  // 11
                       ["true", "false", "false", "hrmn", "skip", "skip", "skip", "skip", "skip"],  // 12
                       ["true", "true", "false", "em", "can", "can", "can", "skip", "skip"],  // 13
                       ["true", "true", "false", "mn", "can", "can", "can", "can", "can"],  // 14
                       ["true", "true", "false", "hr", "can", "can", "can", "skip", "skip"],  // 15
                       ["true", "true", "false", "hrmn", "skip", "skip", "skip", "skip", "skip"],  // 16
                       ["false", "false", "false", "em", "no", "no", "no", "no", "no"],  // 17
                       ["false", "false", "false", "mn", "cannot", "cannot", "cannot", "can", "can"],  // 18
                       ["false", "false", "false", "hr", "no", "no", "no", "no", "no"],  // 19
                       ["false", "false", "false", "hrmn", "cannot", "cannot", "cannot", "can", "can"],  // 20
                       ["false", "false", "true", "em", "no", "no", "no", "no", "no"],  // 21
                       ["false", "false", "true", "mn", "cannot", "cannot", "cannot", "can", "can"],  // 22
                       ["false", "false", "true", "hr", "can", "can", "can", "skip", "skip"],  // 23
                       ["false", "false", "true", "hrmn", "can", "can", "can", "can", "can"],  // 24
                       ["false", "true", "false", "em", "no", "no", "no", "no", "no"],  // 25
                       ["false", "true", "false", "mn", "can", "can", "can", "can", "can"],  // 26
                       ["false", "true", "false", "hr", "no", "no", "no", "no", "no"],  // 27
                       ["false", "true", "false", "hrmn", "can", "can", "can", "can", "can"],  // 28
                       ["false", "true", "true", "em", "no", "no", "no", "no", "no"],  // 29
                       ["false", "true", "true", "mn", "can", "can", "can", "can", "can"],  // 30
                       ["false", "true", "true", "hr", "can", "can", "can", "skip", "skip"],  // 31
                       ["false", "true", "true", "hrmn", "can", "can", "can", "can", "can"]];  // 32

let users = {'em' : 'Martha.Robinson@email.com',            // employee
            'any' : 'Jenny.Thompson@email.com',             // employee1
            'oi' : 'Gerry.Harris@email.com',                // OI user
            'mn' : 'Dermot.Jackson@email.com',              // manager
            'sub' : 'David.Wilson@email.com',               // sub
            'hr' : 'alison.johnson@email.com',              // HR
            'hrmn' : 'Jamie.Duggan@email.com',              // HR+manager
            'dir' : 'Tina.Delaney@email.com',               // HR+manager direct
            'admin' : 'Barry.Deegan@email.com'};            // admin


let url = 'http://stage.mytandem.eu';
let db = 'e2e';
let pw = 'pass';
// let usr = 'Martha.Robinson@email.com';
let testNumber = 0;
let testName = '';
let destination = '';
let destName = [];


fixture `tc12180`
    .page `${url}`;

class LoginPage {
    constructor () {
        this.dataBase              = Selector('#e2e-company-name');
        this.continueButton        = Selector('#e2e-continue-button');
        this.userName              = Selector('#e2e-username');
        this.password              = Selector('#e2e-password');
        this.loginButton           = Selector('#e2e-login-button');
        this.confirm               = Selector('#e2e-yes-button')
    }
};

class AdminPage {
    constructor () {
        this.administration      = Selector('#e2e-system-administration');
        this.profile             = Selector('#e2e-user-profile');
        this.logout              = Selector('#e2e-dropdown-profile-logout')
        this.goals               = Selector('#e2e-manage-goals');
        this.AssignGoalUsr       = Selector('#GoalsSettings_EnableAllowEmployeeToAssignToEveryone')
        this.AssignGoalMng       = Selector('#GoalsSettings_EnableAllowManagerToAssignToEveryone');
        this.AssignGoalHR        = Selector('#GoalsSettings_EnableAllowHRToAssignToEveryone');
        this.confirm             = Selector('.tandem-btn').withText('Save');
    }
};

class AssignGoalPage {
    constructor () {
        this.assignGoal         = Selector('#e2e-assign-goal')
        // this.sendTo             = Selector('#Sendto:');
        this.Sendto             = getElementById('#Sendto\:')
        this.foundItem          = Selector('#found-item');
        this.type               = Selector('#e2e-set-goal-type');
        this.typeSelect         = Selector('.tandem-multiselect__menu-list').withText('Development');
        this.datePriority       = Selector('#newPriorityDueDate');
        this.title              = Selector('.public-DraftEditorPlaceholder-inner').nth(0);
        this.titleContent       = Selector('.public-DraftEditor-content').nth(0);
        this.send               = Selector('.tandem-btn').withText('Send');
        this.confirm            = Selector('#e2e-primary-button');
    }
};

const login_page = new LoginPage();
const admin_page = new AdminPage();
const assignGoal_page = new AssignGoalPage();

for (let i=1; i<=32; i++ ) {
    for (let j=4; j<=8; j++) {
        if (main_matrix[i][j] == 'skip') { break }
        // Test name create
        testName = ('00' + ++testNumber).slice(-3) + '_'
        if (main_matrix[i][0] == 'true') {
            testName = testName + 'on_'
        } else {
            testName = testName + 'off_'
        };
        if (main_matrix[i][1] == 'true') {
            testName = testName + 'on_'
        } else {
            testName = testName + 'off_'
        };
        if (main_matrix[i][2] == 'true') {
            testName = testName + 'on_'
        } else {
            testName = testName + 'off_'
        };
        testName = testName + main_matrix[i][3] + '_' + main_matrix[0][j] + '_' + main_matrix[i][j];
        console.log(testName);

        // Start test
        test(`tc12180_${testName}`, async t => {
            await t
            // Login as admin
            .typeText(login_page.dataBase, db)
            .click(login_page.continueButton)
            .typeText(login_page.userName, users['admin'])
            .typeText(login_page.password, pw)
            .click(login_page.loginButton)
            .expect(Selector('#e2e-user-profile').exists).ok()

            // Go Administration -> Goal
            .click(admin_page.administration)
            .click(admin_page.goals)
            const em_page = await admin_page.AssignGoalUsr.getAttribute('data-value')
            const mn_page = await admin_page.AssignGoalMng.getAttribute('data-value')
            const hr_page = await admin_page.AssignGoalHR.getAttribute('data-value')

            // Settings fo Goals
            let switched = false
            if ( em_page != main_matrix[i][0]) {
                await t.click(admin_page.AssignGoalUsr);
                switched = true;
            };
            if (mn_page != main_matrix[i][1]) {
                await t.click(admin_page.AssignGoalUsr)
                switched = true;
            };
            if (hr_page != main_matrix[i][2]) {
                await t.click(admin_page.AssignGoalHR)
                switched = true;
            };
            if (switched) {
                await t.click(admin_page.confirm)
            };

            // Admin logout
            await t
                .click(admin_page.profile)
                .click(admin_page.logout)
                .click(login_page.confirm)

            // Login as initial user
            await t
                // .typeText(login_page.dataBase, db)
                // .click(login_page.continueButton)
                .typeText(login_page.userName, users[main_matrix[i][3]])
                .typeText(login_page.password, pw)
                .click(login_page.loginButton)
                .expect(Selector('#e2e-user-profile').exists).ok()

            // If user have not menu Set Goal
            if (main_matrix[i][j] == 'no') {
                await t
                    .expect(admin_page.setGoal.exists).notOk()

            // If user can assign Goal
            } else if (main_matrix[i][j] == 'can') {
                if (main_matrix[0][j] == 'any') {
                    destination = users['any'];
                    destName = destination.split('.');
                    console.log(destination);
                    console.log(destName[0]);
                    console.log(111111111);
                    // console.log(destination);
                    await t
                        .click(assignGoal_page.assignGoal)
                        // set destination
                        .typeText(assignGoal_page.sendTo, 'Jenny')
                        .click(assignGoal_page.foundItem)
                        // set date
                        .typeText(assignGoal_page.datePriority, '31/12/2030')
                        // set Goal type
                        .click(assignGoal_page.type)
                        .click(assignGoal_page.typeSelect)
                        // set Title
                        .click(assignGoal_page.title)
                        .typeText(assignGoal_page.titleContent, testName)
                        .click(assignGoal_page.send)
                        .click(assignGoal_page.confirm)
                }
            }
        })
    }
}
