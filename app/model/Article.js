Ext.define('ADM.model.Article', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'title',
        type: 'string'
    },{
        name: 'content_type',
        type: 'int'
    },{
        name: 'content_type_title',
        type: 'string'
    },{
        name: 'anons',
        type: 'string'
    },{
        name: 'img_url',
        type: 'string'
    },{
        name: 'create_time',
        type: 'date'
    },{
        name: 'update_time',
        type: 'date'
    },{
        name: 'content',
        type: 'string',
        convert: function(value) {
            return Ext.String.htmlDecode(value);
        }

    }],
    proxy: {
        type: 'ajax',
        api: {

            read: '/node/api-gm/infoblocks/all',
            update: '/node/api-gm/infoblocks/update',
            create: '/node/api-gm/infoblocks/create',
            destroy: '/node/api-gm/infoblocks/delete'
        },
        startParam: 'offset',
        reader: {
            type: 'json',
            rootProperty: 'data.articles',
            totalProperty: 'data.total',
            messageProperty: 'error',
            successProperty: 'success'
        },
        writer: {
            writer: 'json',
            writeAllFields: true
        },
        actionMethods: {
            read: 'GET',
            update: 'POST',
            create: 'POST',
            destroy: 'POST'
        }
    }
});