Ext.define('ADM.model.Module', {
    extend: 'Ext.data.TreeModel',
    fields: [{
        name: 'id'
    },{
        name: 'parent_id'
    },{
        name: 'module_href',
        type: 'string'
    },{
        name: 'name',
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