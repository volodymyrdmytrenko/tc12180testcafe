import { Selector } from 'testcafe';
import page from './page-model';
import { tstLogin, tstLogout } from './helper';


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


const page = new Page();

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
        testName = testName + main_matrix[i][3] + '_' + 
                    main_matrix[0][j] + '_' + main_matrix[i][j] + Date.now();
        console.log(testName);

        // Start test
        test(`tc12180_${testName}`, async t => {
            await t
            // Login as admin
            .typeText(page.dataBase, db)
            .click(page.continueButton)
            .typeText(page.userName, users['admin'])
            .typeText(page.password, pw)
            .click(page.loginButton)
            .expect(Selector('#e2e-user-profile').exists).ok()

            // Go Administration -> Goal
            .click(page.administration)
            .click(page.goals)
            const em_page = await page.AssignGoalUsr.getAttribute('data-value')
            const mn_page = await page.AssignGoalMng.getAttribute('data-value')
            const hr_page = await page.AssignGoalHR.getAttribute('data-value')

            // Settings fo Goals
            let switched = false
            if ( em_page != main_matrix[i][0]) {
                await t.click(page.AssignGoalUsr);
                switched = true;
            };
            if (mn_page != main_matrix[i][1]) {
                await t.click(page.AssignGoalUsr)
                switched = true;
            };
            if (hr_page != main_matrix[i][2]) {
                await t.click(page.AssignGoalHR)
                switched = true;
            };
            if (switched) {
                await t.click(page.confirm)
            };

            // Admin logout
            await tstLogout()
            // await t
            //     .click(page.profile)
            //     .click(page.logout)
            //     .click(page.logoutConfirm)

            // Login as initial user
            await tstLogin(users[main_matrix[i][3]],pw)
            // await t
            //     .typeText(page.userName, users[main_matrix[i][3]])
            //     .typeText(page.password, pw)
            //     .click(page.loginButton)
            //     .expect(Selector('#e2e-user-profile').exists).ok()

            // If user have not menu Set Goal
            if (main_matrix[i][j] == 'no') {
                await t
                    .expect(page.setGoal.exists).notOk()

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
                        .click(page.assignGoal)
                        // set destination
                        .typeText(page.sendTo, 'Jenny')
                        .click(page.foundItem)
                        // set date
                        .typeText(page.datePriority, '31/12/2030')
                        // set Goal type
                        .click(page.type)
                        .click(page.typeSelect)
                        // set Title
                        .click(page.title)
                        .typeText(page.titleContent, testName)
                        .click(page.send)
                        .click(page.confirm)
                }
            }
        })
    }
}
