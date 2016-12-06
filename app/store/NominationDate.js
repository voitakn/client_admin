Ext.define('ADM.store.NominationDate', {
    extend: 'Ext.data.Store',
    alias: 'store.nominationDate',
    requires: [
        'ADM.model.NominationDate'
    ],
    model: 'ADM.model.NominationDate'
});