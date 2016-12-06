Ext.define('ADM.model.Comment', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        nameParam: 'obj_id',
        type: 'int'
    },{
        name: 'nickname',
        nameParam: 'nickname',
        type: 'string'
    },{
        name: 'fio',
        nameParam: 'fio',
        type: 'string'
    },{
        name: 'name',
        nameParam: 'name',
        type: 'string'
    },{
        name: 'uid',
        nameParam: 'uid',
        type: 'string'
    },{
        name: 'my_comment',
        nameParam: 'my_comment',
        type: 'int'
    },{
        name: 'content',
        nameParam: 'content',
        type: 'string'
    },{
        name: 'content_type',
        nameParam: 'obj_type',
        type: 'int'
    },{
        name: 'create_time',
        nameParam: 'create_time',
        type: 'date'
    },{
        name: 'like_cnt',
        nameParam: 'like_cnt',
        type: 'int'
    },{
        name: 'my_like',
        nameParam: 'my_like',
        type: 'int'
    },{
        name: 'reason',
        nameParam: 'reason',
        type: 'int'
    },{
        name: 'status',
        nameParam: 'status',
        type: 'int'
    },{
        name: 'flag_use',
        type: 'boolean'
    }],
    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'GET',
            update: 'POST',
            destroy: "GET"
        },
        api: {
            read: '/node/admin/comments/',
            update: '/node/admin/complains/content/update',
            create  : '/node/admin/comments/',
            destroy : '/node/admin/comments/'
        },
        reader: {
            type: 'json',
            rootProperty: 'data.comments',
            totalProperty: 'data.total',
            messageProperty: 'error',
            successProperty: 'success'
        },
        writer: {
            writer: 'json',
            nameProperty: 'nameParam',
            writeAllFields: true
        }
    }
});