Ext.define('ADM.model.BookStatus', {
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