Ext.define('ADM.store.UserModerationStatuses', {
    extend: 'Ext.data.Store',
    alias: 'store.userModerationStatuses',
    requires: [
        'ADM.model.UserModerationStatus'
    ],
    data: [{
        id: 0,
        title: 'Премодерация'
    },{
        id: 1,
        title: 'Постмодерация'
    }],
    model: 'ADM.model.UserModerationStatus',
    sorters: [{
        property: 'title',
        direction: 'ASC'
    }]
});