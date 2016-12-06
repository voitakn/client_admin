Ext.define('ADM.view.dropcaps.Controller', {
    extend: 'Base.app.ModuleController',
    alias: 'controller.dropcaps',
    rendererGridContent: function(value) {
        var url = '/node/admin/dropcaps/dropcap-image/' + value.preview;
        return '<img style="max-width: 200px; max-height: 40px;" src="' + url + '">';
    },
    onSelectDropcaps: function(selectionModel, records) {
        var model = this.getViewModel();
        this.onSelectRecord(selectionModel, records);
    }
});
