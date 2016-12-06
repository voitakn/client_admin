Ext.define('ADM.store.Configs', {
    extend: 'Ext.data.Store',
    alias: 'store.configs',
    requires: [
        'ADM.model.Config'
    ],
    model: 'ADM.model.Config'
});