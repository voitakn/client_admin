Ext.define('ADM.store.UserFeeTypes', {
    extend: 'Ext.data.Store',
    alias: 'store.userFeeTypes',
    requires: [
        'ADM.model.UserFeeType'
    ],
    data: [{
        id: 1,
        title: 'Процент'
    },{
        id: 2,
        title: 'Фиксированная сумма'
    }],
    model: 'ADM.model.UserFeeType',
    sorters: [{
        property: 'title',
        direction: 'ASC'
    }]
});