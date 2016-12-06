Ext.define('ADM.model.Vignette', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        mapping: 'vignette_id',
        type: 'int'
    },{
        name: 'content',
        mapping: 'vignette_json',
        type: 'string',
        convert: function (value) {
            if(!value) {
                return {
                    src: null,
                    style: null,
                    iname: null
                }
            }
            var cont = Ext.JSON.decode(value), iname = null;
            if(cont.src) {
                var inames = cont.src.split('/');
                iname = inames[inames.length-1];
            }
            cont.iname = iname;
            return cont;
        }
    }],
    proxy: {
        type: 'ajax',
        url: '/node/admin/vignettes',
        reader: {
            type: 'json',
            rootProperty: 'data[0]'
        }
    }
});