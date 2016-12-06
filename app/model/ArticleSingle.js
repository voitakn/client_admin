Ext.define('ADM.model.ArticleSingle', {
    extend: 'Ext.data.Model',
    proxy: {
        type: 'ajax',
        api: {

            read: '/node/api-gm/infoblocks/single'
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
            update: 'POST',
            create: 'POST',
            destroy: 'POST'
        }
    }
});