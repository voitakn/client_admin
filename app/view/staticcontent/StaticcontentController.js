Ext.define('ADM.view.staticcontent.StaticcontentController', {
    extend: 'Base.app.ModuleController',
    alias: 'controller.staticcontent',

    createContent: function() {
        var staticContent = Ext.ComponentQuery.query('staticcontent')[0];
        var controller = staticContent.getController();
        var panel = controller.lookupReference('panelStaticContent');
        var grid = controller.lookupReference('gridStaticContent');
        var viewModel = staticContent.getViewModel();
        grid.getSelectionModel().deselectAll();
        viewModel.set('record', {});
        viewModel.set('create', true);
        panel.expand();
    },

    onSyncStore: function(cmp) {
        var viewModel = this.getView().getViewModel();
        var store = viewModel.getStore('staticContents');
        var form = cmp.up('form').getForm();
        var values = form.getValues();
        var isCreate = viewModel.get('create');
        var html = 'Данные были успешно изменены';
        if (isCreate) {
            html = 'Данные были успешно добавлены';
            store.add(values);
        }
        store.sync({
            success: function() {
                store.commitChanges();
                Ext.toast({
                    html: html,
                    header: false,
                    align: 't'
                });
            },
            failure: function() {
                store.rejectChanges();
            }
        });
    },

    onStaticContentsLoad: function(store) {
        var record = store.getAt(0);
        var grid = this.lookupReference('gridStaticContent');
        if (!record) {
            this.createContent();
            return;
        }
        grid.getSelectionModel().select(record);
    },

    resetForm: function(cmp) {
        var viewModel = this.getView().getViewModel();
        var form = cmp.up('form').getForm();
        var record = viewModel.get('record');
        if (record && record.isModel) {
            record.reject();
        }
        else{
            form.reset();
        }
    },

    onSelectionRow: function(selectionModel, records) {
        var panel = this.lookupReference('panelStaticContent');
        var viewModel = this.getView().getViewModel();
        var oldRecord = viewModel.get('record');
        if (oldRecord && oldRecord.isModel) {
            oldRecord.reject();
        }
        viewModel.set('create', false);
        viewModel.set('record', records[0]);
        panel.expand();
    },

    renderArea: function(value) {
        switch (value) {
        case 1:
            return 'Новая';
        case 2:
            return 'Часто задаваемые вопросы';
        default :
            return '';
        }
    },

    renderStatus: function(value) {
        switch (value) {
            case 0:
                return 'Новая';
            case 1:
                return 'Активная';
            case 2:
                return 'Неактивная';
            case 9:
                return 'Удалена';
            default :
                return '';
        }
    }

});