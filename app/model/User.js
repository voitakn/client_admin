Ext.define('ADM.model.User', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'uid',
        type: 'string'
    },{
        name: 'uid_hash',
        type: 'string'
    },{
        name: 'login',
        type: 'string'
    },{
        name: 'access',
        type: 'int'
    },{
        name: 'access_title',
        type: 'string'
    },{
        name: 'session_hash',
        type: 'string'
    },{
        name: 'nickname',
        type: 'string'
    },{
        name: 'address',
        type: 'string'
    },{
        name: 'avatar',
        type: 'string'
    },{
        name: 'fio',
        type: 'string'
    },{
        name: 'create_date',
        type: 'date'
    },{
        name: 'balance',
        type: 'number'
    },{
        name: 'author',
        type: 'boolean'
    },{
        name: 'amount_bought',
        type: 'number'
    },{
        name: 'comment_status',
        type: 'int'
    },{
        name: 'comment_status_title',
        type: 'string'
    },{
        name: 'percent',
        type: 'number'
    },{
        name: 'fee_type',
        type: 'int'
    },{
        name: 'role_id',
        convert: function(data) {
            if (data) {
                return data;
            }
            return -1;
        },
        type: 'int'
    },{
        name: 'role_name',
        convert: function(data) {
            if (data) {
                return data;
            }
            return 'Пользователь'
        },
        type: 'string'
    }],
    proxy: {
        type: 'ajax',
        api: {
            read: '/node/admin/users',
            update: '/node/admin/users/update'
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