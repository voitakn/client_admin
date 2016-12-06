Ext.define('ADM.store.Logs', {
    extend: 'Ext.data.Store',
    alias: 'store.logs',
    requires: [
        'ADM.model.Log'
    ],
    model: 'ADM.model.Log',
    remoteFilter: true,
    pageSize: 150,
    filters: [{
        property: 'level',
        value: ''
    },{
        property: 'date_to',
        value: Ext.Date.format(new Date(), 'time')
    },{
        property: 'date_from',
        value:  Ext.Date.format(Ext.Date.add(new Date(), Ext.Date.MONTH, -1), 'time')
    },{
        property: 'message',
        value: ''
    }]
});
