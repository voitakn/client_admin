Ext.define('ADM.view.moderation.users.UsersModel', {
    extend: 'Base.app.ModuleModel',
    alias: 'viewmodel.moderation-users',

    requires: [
        'ADM.store.UserEvents',
        'ADM.store.Users'
    ],

    data: {
        record: null
    },

    stores: {

        userEvents: {
            type: 'userEvents',
            filters: [{
                property: 'user_uid',
                value: '{record.uid}',
                operator: '='
            }],
            autoLoad: true
        },

        users: {
            type: 'users',
            autoLoad: true
        }

    }
});