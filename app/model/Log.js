Ext.define('ADM.model.Log', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'timestamp', type: 'int' },
        { name: 'level', type: 'string' },
        { name: 'message', type: 'string' }
    ],
    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'GET'
        },
        api: {
            read: '/node/admin/logs'
        },
        reader: {
            type: 'json',
            rootProperty: 'data.logs',
            totalProperty: 'data.total',
            messageProperty: 'error',
            successProperty: 'success'
        }
    }
});