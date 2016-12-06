Ext.define('ADM.model.ContentArea', {
    extend: 'Ext.data.Model',
    idProperty: 'area_id',
    proxy: {
        type: 'ajax',
        api: {
            read: '/node/api-gm/content/areas'
        },
        extraParams: {
            session_hash: Ext.util.Cookies.get('session_hash')
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
            read: 'GET'
        }
    }
});