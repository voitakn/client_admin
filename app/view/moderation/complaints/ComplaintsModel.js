Ext.define('ADM.view.moderation.complaints.ComplaintsModel', {
    extend: 'Base.app.ModuleModel',
    alias: 'viewmodel.moderation-complaints',

    requires: [
        'ADM.store.Complaints',
        'ADM.store.Users'
    ],

    data: {
        record: null
    },

    stores: {

        complaints: {
            type: 'complaints',
            autoLoad: true
        },

        users: {
            type: 'users',
            autoLoad: true
        }

    }
});