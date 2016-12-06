Ext.define('ADM.model.VignetteImg', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'image',
        type: 'string'
    },{
        name: 'imagePath',
        type: 'string'
    },{
        name: 'imageSrc',
        type: 'string'
    },{
        name: 'imageLink',
        mapping: 'image',
        type: 'string',
        convert: function (value) {
            return '/node/admin/vignettes/vignette-image/'+value;
        }
    }],
    proxy: {
        type: 'ajax',
        url: '/node/admin/vignettes/images',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }

});