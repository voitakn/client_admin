Ext.define('ADM.store.Roles', {
    extend: 'Ext.data.Store',
    alias: 'store.roles',
    requires: [
        'ADM.model.Role'
    ],
    model: 'ADM.model.Role',
    sorters: [{
        property: 'role_name',
        direction: 'ASC'
    }]
});