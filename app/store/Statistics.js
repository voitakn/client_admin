Ext.define('ADM.store.Statistics', {
    extend: 'Ext.data.Store',
    alias: 'store.statistics',
    requires: [
        'ADM.model.Statistic'
    ],
    model: 'ADM.model.Statistic',
    remoteFilter: true,
    sorters: [{
        property: 'create_date',
        direction: 'ASC'
    }]
});