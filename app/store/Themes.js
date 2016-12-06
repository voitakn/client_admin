Ext.define('ADM.store.Themes', {
    extend: 'Ext.data.Store',
    alias: 'store.themes',
    requires: [
        'ADM.model.Theme'
    ],
    model: 'ADM.model.Theme',
    sorters: [{
        property: 'title',
        direction: 'ASC'
    }]
});