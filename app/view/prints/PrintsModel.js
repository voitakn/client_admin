Ext.define('ADM.view.prints.PrintsModel', {
    extend: 'Base.app.ModuleModel',
    alias: 'viewmodel.prints',

    requires: [
        'ADM.store.PrintStatuses',
        'ADM.store.Prints'
    ],

    data: {
        name: 'Печать'
    },

    stores: {

        prints: {
            type: 'prints',
            autoLoad: true,
            listeners: {
                load: 'onSelectFirstRecord'
            }
        },

        printStatuses: {
            type: 'printStatuses',
            autoLoad: true
        }
    },

    formulas: {

        getDate: {
            bind: '{record.create_time}',
            get: function(value) {
                return Ext.Date.format(value, 'd-m-Y');
            }
        }

    }

});
