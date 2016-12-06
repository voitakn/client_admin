Ext.define('ADM.model.Print', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'address',
        type: 'string'
    },{
        name: 'author',
        type: 'string'
    },{
        name: 'book_format',
        type: 'string'
    },{
        name: 'book_uid',
        type: 'int'
    },{
        name: 'count',
        type: 'int'
    },{
        name: 'create_time',
        type: 'date'
    },{
        name: 'hardcover_type',
        type: 'string'
    },{
        name: 'name',
        type: 'string'
    },{
        name: 'order_id',
        type: 'int'
    },{
        name: 'paper_block',
        type: 'string'
    },{
        name: 'paper_cover',
        type: 'string'
    },{
        name: 'price',
        type: 'int'
    },{
        name: 'print_type',
        type: 'string'
    },{
        name: 'status',
        type: 'int'
    },{
        name: 'update_time',
        type: 'date'
    }],
    proxy: {
        type: 'ajax',
        api: {

            read: '/node/api-gm/printondemand/all',
            update: '/node/api-gm/printondemand/update'
        },
        startParam: 'offset',
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
            read: 'GET',
            update: 'POST'
        }
    }
});