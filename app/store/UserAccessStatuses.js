Ext.define('ADM.store.UserAccessStatuses', {
    extend: 'Ext.data.Store',
    alias: 'store.userAccessStatuses',
    requires: [
        'ADM.model.UserAccessStatus'
    ],
    data: [{
        id: 0,
        title: 'Новый'
    },{
        id: 1,
        title: 'Активный'
    },{
        id: 2,
        title: 'Заблокированный'
    }],
    model: 'ADM.model.UserAccessStatus',
    sorters: [{
        property: 'title',
        direction: 'ASC'
    }]
});