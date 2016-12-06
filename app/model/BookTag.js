Ext.define('ADM.model.BookTag', {
    extend: 'Ext.data.Model',
    idProperty: 'tag_id',
    fields: [{
        name: 'tag_id',
        type: 'int'
    },{
        name: 'tag',
        type: 'string'
    }],
    proxy: {
        type: 'ajax',
        api: {
            read: '/node/admin/books/tags/'
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