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

class AdminPage {
    constructor () {
        this.administration      = Selector('#e2e-system-administration');
        this.profile             = Selector('#e2e-user-profile');
        this.goals               = Selector('#e2e-manage-goals');
        this.AssignGoalUsr       = Selector('#GoalsSettings_EnableAllowEmployeeToAssignToEveryone')
        this.AssignGoalMng       = Selector('#GoalsSettings_EnableAllowManagerToAssignToEveryone');
        this.AssignGoalHR        = Selector('#GoalsSettings_EnableAllowHRToAssignToEveryone');
        this.confirm             = Selector('#main-content > div:nth-child(2) > div.sc-bxivhb.gxUcVt > div.givefb-footer.pt-3.flex-center-end > button > span');
        
    }
};

function fLogin(db_t,usr_t,pw_t){
  const page = new LoginPage();
  test('tstLogin', async t => {
      await t
          .typeText(page.dataBase, db_t)
          .click(page.continueButton)
          .typeText(page.userName, usr_t)
          .typeText(page.password, pw_t)
          .click(page.loginButton)
          .expect(Selector('#e2e-user-profile').exists).ok();
  });
};

function fSettings(em,mn,hr) {
  const page = new AdminPage();
  let switched = false;
  test('tstSetting', async t => {
      await t
        .click(page.administration)
        .click(page.goals)
        if (page.AssignGoalUsr.getAttribute('data-value').notEql(em)) {
            t.click(page.AssignGoalUsr);
            switched = true;
        };
        if (page.AssignGoalMng.getAttribute('data-value').notEql(mn)) {
            t.click(page.AssignGoalUsr)
            switched = true;
        };
        if (page.AssignGoalUsr.getAttribute('data-value').notEql(hr)) {
            t.click(page.AssignGoalUsr)
            switched = true;
        };
        if (switched) {
            t.click(page.confirm)
        };

    });
};

fLogin(db,usr,pw);

for (i=1; i<=32; i++ ) {
    fSettings(main_matrix[i][0], main_matrix[i][0], main_matrix[i][0]);
    for (j=4; j<=8; j++) {
        
    };
}
