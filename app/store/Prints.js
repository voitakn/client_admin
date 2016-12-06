Ext.define('ADM.store.Prints', {
    extend: 'Ext.data.Store',
    alias: 'store.prints',
    requires: [
        'ADM.model.Print'
    ],
    model: 'ADM.model.Print',
    sorters: [{
        property: 'title',
        direction: 'ASC'
    }]
});