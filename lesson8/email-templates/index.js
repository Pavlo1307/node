const { emailActionsEnum } = require('../config');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'WELCOME'
    },

    [emailActionsEnum.CREATE]: {
        templateName: 'create',
        subject: 'CREATE'
    },

    [emailActionsEnum.DELETE]: {
        templateName: 'delete',
        subject: 'DELETE'
    },

    [emailActionsEnum.LOGIN]: {
        templateName: 'login',
        subject: 'LOGIN'
    },

    [emailActionsEnum.UPDATE]: {
        templateName: 'update',
        subject: 'UPDATE'
    },
};
