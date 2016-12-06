Ext.define('ADM.model.Notice', {
    extend: 'Ext.data.Model',
    idProperty: 'uid',
    fields: [{
        name: 'uid',
        type: 'string'
    },{
        name: 'login',
        type: 'string'
    },{
        name: 'token'
    }],
    proxy: {
        type: 'ajax',
        url: '/node/admin/notices',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});