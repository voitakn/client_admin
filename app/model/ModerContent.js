Ext.define('ADM.model.ModerContent', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'comment_id',
        nameSync: 'obj_id',
        type: 'int'
    },{
        name: 'content',
        type: 'string'
    },{
        name: 'content_type',
        nameSync: 'obj_type',
        type: 'int'
    },{
        name: 'user_uid',
        nameSync: 'user_uid',
        type: 'string',
        mapping: 'uid'
    },{
        name: 'login',
        nameSync: 'login',
        type: 'string'
    },{
        name: 'obj_id',
        nameSync: 'parent_obj_id',
        type: 'int'
    },{
        name: 'obj_type',
        nameSync: 'parent_obj_type',
        type: 'int'
    },{
        name: 'obj_login',
        nameSync: 'obj_login',
        type: 'string'
    },{
        name: 'status',
        nameSync: 'status',
        type: 'string'
    },{
        name: 'comment_status',
        nameSync: 'comment_status',
        type: 'int'
    },{
        name: 'create_time',
        nameSync: 'create_time',
        type: 'date',
        convert: function(value) {
            var date = new Date(value);
            return Ext.Date.format(date, 'Y-m-d h:i:s');
        }
    }],
    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'GET',
            update: 'POST'
        },
        api: {
            read: '/node/admin/complains/premoderate-content',
            update: '/node/admin/complains/content/update'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            messageProperty: 'error',
            successProperty: 'success'
        },
        writer: {
            writer: 'json',
            nameProperty: 'nameSync',
            writeAllFields: true
        }
    }
});
