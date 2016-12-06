Ext.define('ADM.store.Complaints', {
    extend: 'Ext.data.Store',
    alias: 'store.complaints',
    requires: [
        'ADM.model.Complaint'
    ],
    sorters: [{
        property: 'create_time',
        direction: 'ASC'
    }],
    modelSort: {
        status: 1,
        obj_type: 2,
        create_date: 3,
        complain_level: 4,
        login: 5,
        obj_login: 6
    },
    remoteSort: true,
    remoteFilter: true,
    model: 'ADM.model.Complaint',
    autoLoad: true
});