Ext.define('ADM.store.UserEvents', {
    extend: 'Ext.data.Store',
    alias: 'store.userEvents',
    requires: [
        'ADM.model.UserEvent'
    ],
    model: 'ADM.model.UserEvent',
    sorters: [{
        property: 'event_date',
        direction: 'DESC'
    }],
    groupField: 'event_const',
    remoteFilter: true
});