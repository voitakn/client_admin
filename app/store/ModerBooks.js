Ext.define('ADM.store.ModerBooks', {
    extend: 'Ext.data.Store',
    alias: 'store.moderBooks',
    requires: [
        'ADM.model.ModerBook'
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
    model: 'ADM.model.ModerBook',
    remoteFilter: true
});
