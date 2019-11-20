// ##########################################################################
// #  TANDEM PROJECT
// #  e2e test by test case 12180
// #  Volodymyr.Dmytrenko@arvosoftware.com
// ##########################################################################

import { Selector } from 'testcafe';

class Page {
    constructor (text) {
        const elementWithClassName = Selector(id => {
            return document.getElementsByClassName(id);
        });

        // Login
        this.dataBase               = Selector('#e2e-company-name');
        this.continueButton         = Selector('#e2e-continue-button');
        this.userName               = Selector('#e2e-username');
        this.password               = Selector('#e2e-password');
        this.loginButton            = Selector('#e2e-login-button');
        this.logoutConfirm          = Selector('#e2e-yes-button');
        // Admin Goals setting
        this.administration         = Selector('#e2e-system-administration');
        this.profile                = Selector('#e2e-user-profile');
        this.logout                 = Selector('#e2e-dropdown-profile-logout')
        this.goals                  = Selector('#e2e-manage-goals');
        this.assignGoalUsr          = Selector('#GoalsSettings_EnableAllowEmployeeToAssignToEveryone')
        this.assignGoalMng          = Selector('#GoalsSettings_EnableAllowManagerToAssignToEveryone');
        this.assignGoalHR           = Selector('#GoalsSettings_EnableAllowHRToAssignToEveryone');
        this.saveSetting            = Selector('.tandem-btn').withText('Save');
        // Assign Goals
        this.assignGoal             = Selector('#e2e-assign-goal')
        this.sendTo                 = elementWithClassName('e2e-search-field')
        this.foundItem              = elementWithClassName('found-item');
        this.type                   = Selector('#e2e-set-goal-type');
        this.typeSelect             = Selector('.tandem-multiselect__menu-list').withText('Development');
        this.datePriority           = Selector('#newPriorityDueDate');
        this.title                  = Selector('.public-DraftEditorPlaceholder-inner').nth(0);
        this.titleContent           = Selector('.public-DraftEditor-content').nth(0);
        this.send                   = Selector('.tandem-btn').withText('Send');
        this.confirm                = Selector('#e2e-primary-button');
        this.mainSearch             = Selector('#e2e-main-search-field');
        this.notification           = Selector('#e2e-desktop-notifications');
        this.allNotification        = Selector('#e2e-view-all-notifications');
        // this.findGoal               = Selector('#p').withText(text);

    }
};

export default new Page();
