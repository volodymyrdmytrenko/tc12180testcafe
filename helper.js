import { t } from 'testcafe';
import page from './pare-model';

export async function tstLogin(usr, pw, db='e2e', firstTime=false) {
    // Login
    if (firstTime) {
        await t.typeText(page.dataBase, db)
        await t.click(page.continueButton)
    }
    await t.typeText(page.userName, usr)
    await t.typeText(page.password, pw)
    await t.click(page.loginButton)
    await t.expect(Selector('#e2e-user-profile').exists).ok()
};

