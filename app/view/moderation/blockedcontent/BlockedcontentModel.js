Ext.define('ADM.view.moderation.blockedcontent.BlockedcontentModel', {
    extend: 'Base.app.ModuleModel',
    alias: 'viewmodel.moderation-blockedcontent',

    view: 'moderation-blockedcontent',

    requires: [
        'ADM.store.BlockedContents'
    ],

    data: {
        name: 'Заблокированный контент'
    },

    stores: {
        blockedContents: {
            type: 'blockedContents',
            autoLoad: true
        }
    }
});
