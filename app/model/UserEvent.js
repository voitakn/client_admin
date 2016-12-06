Ext.define('ADM.model.UserEvent', {
    extend: 'Ext.data.Model',
    fields: [{
        type: 'string',
        name: 'event_const'
    },{
        name: 'event_date',
        type: 'date',
        convert: function(value) {
            if (!value) {
                return '';
            }
            var date = new Date(value);
            return Ext.Date.format(date, 'Y-m-d H:i');
        }
    }],
    proxy: {
        type: 'ajax',
        api: {
            read: '/node/admin/users/events'
        },
        reader: {
            type: 'json',
            rootProperty: 'data.events[0]',
            totalProperty: 'data.total[0]',
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