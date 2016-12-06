Ext.define('ADM.model.Dropcap', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        mapping: 'dropcap_id',
        type: 'int'
    },{
        name: 'content',
        mapping: 'dropcap_json',
        type: 'string',
        convert: function (value) {
            return Ext.JSON.decode(value);
        }
    }],
    proxy: {
        type: 'ajax',
        api: {
            read: '/node/admin/dropcaps',
            destroy : '/node/admin/dropcaps/remove'
        },
        reader: {
            type: 'json',
            rootProperty: 'data[0]'
        }
    }
});