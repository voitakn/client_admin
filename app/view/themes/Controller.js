Ext.define('ADM.view.themes.Controller', {
    extend: 'Base.app.ModuleController',
    alias: 'controller.themes',
    onSelectTheme: function(selectionModel, records) {
        var model = this.getViewModel();
        var store = model.getStore('folders');
        var row = records[0];
        var id = row.get('theme_uid');
        store.getProxy().setApi({
            read: '/node/admin/themes/'+id+'/files'
        });
        store.load();
        this.onSelectRecord(selectionModel, records);
    }
});