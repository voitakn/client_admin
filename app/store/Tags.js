Ext.define('ADM.store.Tags', {
    extend: 'Ext.data.Store',
    alias: 'store.tags',
    requires: [
        'ADM.model.Tag'
    ],
    model: 'ADM.model.Tag',
    sorters: [{
        property: 'name',
        direction: 'ASC'
    }]
});