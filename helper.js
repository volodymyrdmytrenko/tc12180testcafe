// ##########################################################################
// #  TANDEM PROJECT
// #  e2e test by test case 12180
// #  Volodymyr.Dmytrenko@arvosoftware.com
// ##########################################################################

import { t } from 'testcafe';
import page from './page-model';

export async function tstLogin(usr, pw, db='e2e', firstTime=false) {
    if (firstTime) {
        await t.typeText(page.dataBase, db)
        await t.click(page.continueButton)
    }
    await t.typeText(page.userName, usr)
    await t.typeText(page.password, pw)
    await t.click(page.loginButton)
};

export async function tstLogout() {
    await t
        .click(page.profile)
        .click(page.logout)
        .click(page.logoutConfirm)
};

export async function tstAdminSettings(em, mn, hr) {
    // Go Administration -> Goal
    await t.click(page.administration)
    await t.click(page.goals)
    const em_page = await page.assignGoalUsr.getAttribute('data-value')
    const mn_page = await page.assignGoalMng.getAttribute('data-value')
    const hr_page = await page.assignGoalHR.getAttribute('data-value')

    // Settings for Goals
    let switched = false
    if ( em_page != em) {
        await t.click(page.AssignGoalUsr);
        switched = true;
    };
    if (mn_page != mn) {
        await t.click(page.AssignGoalUsr)
        switched = true;
    };
    if (hr_page != hr) {
        await t.click(page.AssignGoalHR)
        switched = true;
    };
    if (switched) {
        await t.click(page.confirm)
    };
    
};