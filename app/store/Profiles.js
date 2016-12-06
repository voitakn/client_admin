Ext.define('ADM.store.Profiles', {
    extend: 'Ext.data.Store',
    storeId: 'profile',
    requires: [
        'ADM.model.Profile'
    ],
    model: 'ADM.model.Profile'
});