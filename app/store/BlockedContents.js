Ext.define('ADM.store.BlockedContents', {
    extend: 'Ext.data.Store',
    alias: 'store.blockedContents',
    requires: [
        'ADM.model.BlockedContent'
    ],
    model: 'ADM.model.BlockedContent',
    sorters: [{
        property: 'change_date',
        direction: 'DESC'
    }]
});