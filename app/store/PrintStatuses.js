Ext.define('ADM.store.PrintStatuses', {
    extend: 'Ext.data.Store',
    alias: 'store.printStatuses',
    requires: [
        'ADM.model.PrintStatus'
    ],
    data: [{
        id: 1,
        title: 'Новый'
    },{
        id: 2,
        title: 'Оплачен'
    },{
        id: 3,
        title: 'Выполнен'
    }],
    model: 'ADM.model.PrintStatus',
    sorters: [{
        property: 'title',
        direction: 'ASC'
    }]
});