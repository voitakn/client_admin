Ext.define('ADM.view.staticcontent.StaticcontentModel', {
    extend: 'Base.app.ModuleModel',
    alias: 'viewmodel.staticcontent',
    view: 'view-staticcontent',
    requires: [
        'ADM.model.StaticContent',
        'ADM.model.ContentArea'
    ],


    data: {
        create: false,
        record: {}
    },

    stores: {

        staticContents: {
            extend: 'Ext.data.Store',
            model: 'ADM.model.StaticContent',
            autoLoad: true,
            listeners: {
                load: 'onStaticContentsLoad'
            }
        },

        statusContent: {
            fields: [
                'id',
                'title'
            ],
            data: [{
                id: 0,
                title: 'Новая'
            },{
                id: 1,
                title: 'Активная'
            },{
                id: 2,
                title: 'Неактивная'
            },{
                id: 9,
                title: 'Удалена'
            }]
        },

        areasContent: {
            extend: 'Ext.data.Store',
            model: 'ADM.model.ContentArea',
            autoLoad: true
        }
    },

    formulas: {

        isHidden: {
            get: function (get) {
                return !get('create') && Ext.Object.isEmpty(get('record'));
            }
        },

        getInfo: {
            get: function (get) {
                var isSelected = !Ext.Object.isEmpty(get('record'));
                var isCreate = get('create');
                if (isSelected || isCreate) {
                    return '';
                }
                else {
                    return  '';
                }
            }
        },

        getTitle: {
            get: function(get) {
                var isCreate = get('create');
                if (isCreate) {
                    return 'Создание';
                }
                else {
                    return 'Редактирование';
                }
            }
        }
    }
});