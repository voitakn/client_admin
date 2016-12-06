Ext.define('ADM.model.Role', {
    extend: 'Ext.data.Model',
    idProperty: 'role_id',
    fields: [{
        name: 'role_id',
        type: 'int'
    },{
        name: 'role_name',
        type: 'string'
    }],
    proxy: {
        type: 'ajax',
        api: {
            read: '/node/admin/roles',
            create: '/node/admin/roles/create'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            totalProperty: 'data',
            messageProperty: 'error',
            successProperty: 'success'
        },
        writer: {
            writer: 'json',
            writeAllFields: true
        },
        actionMethods: {
            read: 'GET',
            update: 'POST'
        }
    }
});