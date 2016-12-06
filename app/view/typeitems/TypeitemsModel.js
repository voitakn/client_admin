Ext.define('ADM.view.typeitems.TypeitemsModel', {
    extend: 'Base.app.ModuleModel',
    alias: 'viewmodel.typeitems',

    requires: [
        'ADM.store.TypeItems'
    ],

    data: {
        name: 'Типы элементов'
    },

    stores: {
        typeItems: {
            type: 'typeItems',
            autoLoad: true,
            listeners: {
                load: 'onSelectFirstRecord'
            }
        }
    }
});
