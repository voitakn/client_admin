Ext.define('ADM.store.Users', {
    extend: 'Ext.data.Store',
    alias: 'store.users',
    requires: [
        'ADM.model.User'
    ],
    model: 'ADM.model.User',
    sorters: [{
        property: 'login',
        direction: 'ASC'
    }]
});