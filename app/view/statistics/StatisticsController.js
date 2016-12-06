Ext.define('ADM.view.statistics.StatisticsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.statistics',

    onSearch: function() {
        var store = this.getViewModel().getStore('statistics');
        var form = this.lookupReference('form');
        var values = form.getValues();
        store.load({
            params: values
        })
    }
});
