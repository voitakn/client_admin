Ext.define('ADM.model.ProcedureRoles', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'proc',
        type: 'string'
    }],
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});