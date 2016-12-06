Ext.define('ADM.model.Config', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'ajax',
        api: {
            read: '/node/admin/config'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'error',
            successProperty: 'success'
        },
        writer: {
            writer: 'json',
            writeAllFields: true
        },
        actionMethods: {
            read: 'GET'
        }
    }
});