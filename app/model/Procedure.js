Ext.define('ADM.model.Procedure', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'ROUTINE_NAME',
        type: 'string'
    }],
    proxy: {
        type: 'ajax',
        url: '/node/admin/procedures',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});