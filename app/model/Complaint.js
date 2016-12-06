Ext.define('ADM.model.Complaint', {
    extend: 'Ext.data.Model',
    idProperty: 'complain_id',
    fields: [{
        name: 'obj_id',
        type: 'int'
    },{
        name: 'obj_type',
        type: 'int'
    },{
        name: 'complain_level',
        type: 'int'
    },{
        name: 'complain',
        type: 'string'
    },{
        name: 'complain_detail',
        type: 'string'
    },{
        name: 'create_date',
        type: 'date',
        convert: function(value) {
            var date = new Date(value);
            return Ext.Date.format(date, 'Y-m-d h:i:s');
        }
    },{
        name: 'complain_id',
        type: 'int'
    },{
        name: 'status',
        mapping: 'complain_status',
        type: 'int'
    },{
        name: 'uid',
        type: 'string'
    },{
        name: 'login',
        type: 'string'
    },{
        name: 'fio',
        type: 'string'
    },{
        name: 'nickname',
        type: 'string'
    },{
        name: 'comment',
        type: 'string'
    },{
        name: 'obj_login',
        type: 'string'
    }],
    proxy: {
        type: 'ajax',
        actionMethods: {
            read: 'GET',
            update: 'POST'
        },
        api: {
            read: '/node/admin/complains',
            update: '/node/admin/complains/update'
        },
        reader: {
            type: 'json',
            rootProperty: 'data.complains',
            totalProperty: 'data.total',
            messageProperty: 'error',
            successProperty: 'success'
        }
    }
});