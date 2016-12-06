Ext.define('ADM.store.Nominations', {
    extend: 'Ext.data.Store',
    alias: 'store.nominations',
    requires: [
        'ADM.model.Nomination'
    ],
    model: 'ADM.model.Nomination',
    sorters: [{
        property: 'book_name',
        direction: 'ASC'
    }]
});