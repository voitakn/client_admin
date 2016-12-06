Ext.define('ADM.model.ObjectType', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'title',
        type: 'string'
    }],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: ''
        }
    }
});