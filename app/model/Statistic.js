Ext.define('ADM.model.Statistic', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'books',
        type: 'int'
    },{
        name: 'files',
        type: 'int'
    },{
        name: 'users',
        type: 'int'
    },{
        name: 'create_date',
        type: 'date'
    }],
    proxy: {
        type: 'ajax',
        api: {
            read: '/node/admin/statistics/all'
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
