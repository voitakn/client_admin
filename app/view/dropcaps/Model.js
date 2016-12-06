Ext.define('ADM.view.dropcaps.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dropcaps',
    requires: [
        'ADM.model.Dropcap'
    ],
    view: 'dropcaps',
    data: {
        title: 'Буквицы',
        id: 0,
        record: {}
    },
    stores: {
        dropcaps: {
            extend: 'Ext.data.Store',
            model: 'ADM.model.Dropcap',
            autoLoad: true
        }
    },
    formulas: {}
});