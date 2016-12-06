Ext.define('ADM.model.BlockedContent', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'obj_id',
        type: 'int'
    },{
        name: 'book_uid',
        type: 'int'
    },{
        name: 'change_date',
        type: 'date'
    },{
        name: 'complain_detail',
        type: 'string'
    },{
        name: 'content',
        type: 'string'
    },{
        name: 'login',
        type: 'string'
    },{
        name: 'obj_type',
        type: 'int'
    },{
        name: 'reason',
        type: 'string'
    },{
        name: 'status',
        type: 'int'
    }],
    proxy: {
        type: 'ajax',
        api: {
            read: '/node/admin/complains/blocked-content',
            destroy: '/node/admin/complains/content/lock'
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
            destroy: 'POST'
        }
    }
});