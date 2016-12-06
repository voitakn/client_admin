Ext.define('ADM.model.Theme', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'theme_uid',
        type: 'int'
    },{
        name: 'theme_name',
        type: 'string'
    },{
        name: 'theme_path',
        type: 'string'
    },{
        name: 'url',
        type: 'string'
    }],
    proxy: {
        type: 'ajax',
        api: {
            read: '/node/admin/themes'
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