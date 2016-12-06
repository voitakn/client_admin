Ext.define('ADM.store.Comments', {
    extend: 'Ext.data.Store',
    alias: 'store.comments',
    requires: [
        'ADM.model.Comment'
    ],
    sorters: [{
        property: 'create_time',
        direction: 'ASC'
    }],
    model: 'ADM.model.Comment'
});
