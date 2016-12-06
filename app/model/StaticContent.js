Ext.define('ADM.model.StaticContent', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'static_page_id',
        type: 'string',
        nameParam: 'page_id'
    }],
    idProperty: 'static_page_id',
    proxy: {
        type: 'ajax',
        api: {
            read: '/node/api-gm/content/all',
            create: '/node/api-gm/content/add',
            update: '/node/api-gm/content/update'
        },
        extraParams: {
            session_hash: Ext.util.Cookies.get('session_hash')
        },
        startParam: 'offset',
        reader: {
            type: 'json',
            rootProperty: 'data.pages',
            totalProperty: 'data.total',
            messageProperty: 'error',
            successProperty: 'success'
        },
        writer: {
            writer: 'json',
            nameProperty: 'nameParam',
            writeAllFields: true
        },
        actionMethods: {
            read: 'GET',
            create: 'POST',
            update: 'POST'
        }
    }
});