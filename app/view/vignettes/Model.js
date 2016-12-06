Ext.define('ADM.view.vignettes.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.vignettes',
    requires: [
        'ADM.model.Vignette',
        'ADM.model.VignetteImg'
    ],
    view: 'vignettes',
    data: {
        title: 'Виньетки',
        id: 0,
        iname: null,
        record: {}
    },
    stores: {
        vignettes: {
            extend: 'Ext.data.Store',
            model: 'ADM.model.Vignette',
            autoLoad: true
        },
        styles: {
            extend: 'Ext.data.Store',
            fields: [{
                name: 'property',
                type: 'string'
            },{
                name: 'value',
                type: 'string'
            }],
            autoLoad: false
        },
        images: {
            extend: 'Ext.data.Store',
            model: 'ADM.model.VignetteImg',
            autoLoad: true
        }
    },
    formulas: {}
});