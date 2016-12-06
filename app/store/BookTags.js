Ext.define('ADM.store.BookTags', {
    extend: 'Ext.data.Store',
    alias: 'store.bookTags',
    requires: [
        'ADM.model.BookTag'
    ],
    model: 'ADM.model.BookTag',
    sorters: [{
        property: 'name',
        direction: 'ASC'
    }]
});