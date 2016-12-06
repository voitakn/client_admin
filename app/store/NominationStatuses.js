Ext.define('ADM.store.NominationStatuses', {
    extend: 'Ext.data.Store',
    alias: 'store.nominationStatuses',
    requires: [
        'ADM.model.NominationStatus'
    ],
    data: [{
        id: 1,
        title: 'Новая'
    },{
        id: 2,
        title: 'Необходима корректировка'
    },{
        id: 3,
        title: 'Откорректирована'
    },{
        id: 4,
        title: 'Номинирована'
    },{
        id: 9,
        title: 'Отклонена'
    }],
    model: 'ADM.model.NominationStatus',
    sorters: [{
        property: 'title',
        direction: 'ASC'
    }]
});