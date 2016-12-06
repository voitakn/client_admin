Ext.define('ADM.model.Profile', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'ajax',
        api: {
            read: '/node/admin/users/info'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'error',
            successProperty: 'success'
        },
        writer: {
            writer: 'json'
        },
        actionMethods: {
            read: 'GET'
        }
    }
});