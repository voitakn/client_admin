Ext.define('ADM.store.Books', {
    extend: 'Ext.data.Store',
    alias: 'store.books',
    requires: [
        'ADM.model.Book'
    ],
    modelSort: {
        best: 1,
        recommended: 2,
        author: 3,
        name: 4,
        publication_date: 5,
        login: 6,
        approved: 7
    },
    sorters: [{
        property: 'publication_date',
        direction: 'ASC'
    }],
    remoteSort: true,
    model: 'ADM.model.Book',
    remoteFilter: true
});