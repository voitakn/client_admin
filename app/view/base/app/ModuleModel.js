Ext.define('Base.app.ModuleModel', {
    extend: 'Ext.app.ViewModel',

    formulas: {

        getTitleForm: {
            bind: '{isCreate}',
            get: function(value) {
                if (value) {
                    return 'Создание';
                }
                else {
                    return 'Редактирование';
                }
            }
        },

        getTextButton: {
            bind: '{isCreate}',
            get: function(value) {
                if (value) {
                    return 'Создать';
                }
                else {
                    return 'Сохранить';
                }
            }
        }
    }
});