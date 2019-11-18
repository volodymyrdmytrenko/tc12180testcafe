import { Selector } from 'testcafe';

let main_matrix = [["for_em", "for_mn", "for_hr", "role", "any", "oi", "all", "dir", "sub"],
                       ["on", "on", "on", "em", "can", "can", "can", "skip", "skip"],  // 1
                       ["on", "on", "on", "mn", "can", "can", "can", "can", "can"],  // 2
                       ["on", "on", "on", "hr", "can", "can", "can", "skip", "skip"],  // 3
                       ["on", "on", "on", "hrmn", "skip", "skip", "skip", "skip", "skip"],  // 4
                       ["on", "off", "on", "em", "can", "can", "can", "skip", "skip"],  // 5
                       ["on", "off", "on", "mn", "can", "can", "can", "can", "can"],  // 6
                       ["on", "off", "on", "hr", "can", "can", "can", "skip", "skip"],  // 7
                       ["on", "off", "on", "hrmn", "skip", "skip", "skip", "skip", "skip"],  // 8
                       ["on", "off", "off", "em", "can", "can", "can", "skip", "skip"],  // 9
                       ["on", "off", "off", "mn", "can", "can", "can", "can", "can"],  // 10
                       ["on", "off", "off", "hr", "can", "can", "can", "skip", "skip"],  // 11
                       ["on", "off", "off", "hrmn", "skip", "skip", "skip", "skip", "skip"],  // 12
                       ["on", "on", "off", "em", "can", "can", "can", "skip", "skip"],  // 13
                       ["on", "on", "off", "mn", "can", "can", "can", "can", "can"],  // 14
                       ["on", "on", "off", "hr", "can", "can", "can", "skip", "skip"],  // 15
                       ["on", "on", "off", "hrmn", "skip", "skip", "skip", "skip", "skip"],  // 16
                       ["off", "off", "off", "em", "no", "no", "no", "no", "no"],  // 17
                       ["off", "off", "off", "mn", "cannot", "cannot", "cannot", "can", "can"],  // 18
                       ["off", "off", "off", "hr", "no", "no", "no", "no", "no"],  // 19
                       ["off", "off", "off", "hrmn", "cannot", "cannot", "cannot", "can", "can"],  // 20
                       ["off", "off", "on", "em", "no", "no", "no", "no", "no"],  // 21
                       ["off", "off", "on", "mn", "cannot", "cannot", "cannot", "can", "can"],  // 22
                       ["off", "off", "on", "hr", "can", "can", "can", "skip", "skip"],  // 23
                       ["off", "off", "on", "hrmn", "can", "can", "can", "can", "can"],  // 24
                       ["off", "on", "off", "em", "no", "no", "no", "no", "no"],  // 25
                       ["off", "on", "off", "mn", "can", "can", "can", "can", "can"],  // 26
                       ["off", "on", "off", "hr", "no", "no", "no", "no", "no"],  // 27
                       ["off", "on", "off", "hrmn", "can", "can", "can", "can", "can"],  // 28
                       ["off", "on", "on", "em", "no", "no", "no", "no", "no"],  // 29
                       ["off", "on", "on", "mn", "can", "can", "can", "can", "can"],  // 30
                       ["off", "on", "on", "hr", "can", "can", "can", "skip", "skip"],  // 31
                       ["off", "on", "on", "hrmn", "can", "can", "can", "can", "can"]];  // 32

let users = {'em': 'Martha.Robinson@email.com',            // employee
            'em1': 'Jenny.Thompson@email.com',             // employee1
            'oi': 'Gerry.Harris@email.com',                // OI user
            'mn': 'Dermot.Jackson@email.com',              // manager
            'sub': 'David.Wilson@email.com',               // sub
            'hr': 'alison.johnson@email.com',              // HR
            'hrmn': 'Jamie.Duggan@email.com',              // HR+manager
            'dir': 'Tina.Delaney@email.com',               // HR+manager direct
            'admin': 'Barry.Deegan@email.com'};            // admin


let url = 'http://stage.mytandem.eu';
let db = 'e2e';
let pw = 'pass';
let usr = 'Martha.Robinson@email.com';


fixture `001tc12180`
    .page `${url}`;

    

class LoginPage {
    constructor () {
        this.dataBase              = Selector('#e2e-company-name');
        this.continueButton        = Selector('#e2e-continue-button');
        this.userName              = Selector('#e2e-username');
        this.password              = Selector('#e2e-password');
        this.loginButton           = Selector('#e2e-login-button');
    }
};

const page = new LoginPage();

test('tstLogin', async t => {
    // Test code
    await t
        .typeText(page.dataBase, db)
        .click(page.continueButton)
        .typeText(page.userName, usr)
        .typeText(page.password, pw)
        .click(page.loginButton)
        .expect(Selector('#e2e-user-profile').exists).ok();
});

