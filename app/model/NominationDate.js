Ext.define('ADM.model.NominationDate', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'date',
        type: 'int'
    }],
    proxy: {
        type: 'ajax',
        api: {

            read: '/node/api-gm/nominations/date',
            update: '/node/api-gm/nominations/date/update'
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
        },
        actionMethods: {
            read: 'GET',
            update: 'POST'
        }
    }
});