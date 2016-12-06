Ext.define('ADM.store.TypeItems', {
    extend: 'Ext.data.Store',
    alias: 'store.typeItems',
    requires: [
        'ADM.model.TypeItem'
    ],
    model: 'ADM.model.TypeItem'
});