Ext.define('ADM.model.TypeItem', {
    extend: 'Ext.data.Model',
    idProperty: 'item_type_id',
    fields: [{
        name: 'item_type_id',
        type: 'int'
    },{
        name: 'item_type',
        type: 'string'
    },{
        name: 'name',
        type: 'string'
    },{
        name: 'min_length',
        type: 'int'
    },{
        name: 'max_length',
        type: 'int'
    },{
        name: 'new_page',
        type: 'boolean'
    },{
        name: 'uniq',
        type: 'boolean'
    }],
    proxy: {
        type: 'ajax',
        actionMethods: {
            create: 'POST',
            read: 'GET',
            update: 'POST',
            destroy: 'POST'
        },
        api: {
            create: '/node/admin/item-types/create',
            read: '/node/admin/item-types/list',
            update: '/node/admin/item-types/update',
            destroy: '/node/admin/item-types/remove'
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
        }
    }
});