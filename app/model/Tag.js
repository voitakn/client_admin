Ext.define('ADM.model.Tag', {
    extend: 'Ext.data.Model',
        fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'name',
        type: 'string'
    }],
    proxy: {
        type: 'ajax',
        api: {
            read: '/node/admin/tags'
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
            read: 'GET'
        }
    }
});
