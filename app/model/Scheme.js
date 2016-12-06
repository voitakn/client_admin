Ext.define('ADM.model.Scheme', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'scheme',
        type: 'string'
    },{
        name: 'use',
        type: 'boolean'
    },{
        name: 'role_id',
        type: 'int'
    }],
    proxy: {
        type: 'ajax',
        api: {
            read: '/node/admin/role-schemas/' + '{record.role_id}',
            update: '/node/admin/role-schemas/' + '{record.role_id}' +'/edit'
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
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